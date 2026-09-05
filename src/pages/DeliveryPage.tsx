import React, { useState, useEffect } from 'react';
import {
  Truck,
  Package,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Clock,
  QrCode,
  Barcode as BarcodeIcon,
  Phone,
  ChevronDown,
  Building2,
  LogOut,
  Factory,
  Search,
  RefreshCw,
  ExternalLink,
  Copy,
  Check,
  Camera,
  Navigation,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api.js';
import { IDeliveryPartner, IWarehouseLocationInfo, IAuthUser, IPartnerPickupItem } from '../types.js';
import { CameraScannerModal } from '../components/CameraScannerModal.js';
import { playScanSuccessBeep, playScanErrorBuzzer } from '../utils/sound.js';

interface DeliveryPageProps {
  currentUser?: IAuthUser | null;
  onLogout?: () => void;
  onSwitchPortal?: (targetRole: 'manufacturer' | 'warehouse' | 'delivery') => void;
}

export const DeliveryPage: React.FC<DeliveryPageProps> = ({ currentUser, onLogout, onSwitchPortal }) => {
  // Current active delivery partner
  const [partner, setPartner] = useState<IDeliveryPartner | null>(null);
  const [availablePartners, setAvailablePartners] = useState<IDeliveryPartner[]>([]);
  const [warehouseLocation, setWarehouseLocation] = useState<IWarehouseLocationInfo | null>(null);
  const [pickups, setPickups] = useState<IPartnerPickupItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPartnerSwitcher, setShowPartnerSwitcher] = useState(false);

  // Clean Navigation Tab
  const [activeTab, setActiveTab] = useState<'pickups' | 'warehouse'>('pickups');

  // Filter & Search
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Scanner modal state
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [targetedPickupItem, setTargetedPickupItem] = useState<IPartnerPickupItem | null>(null);
  const [confirmingItemKey, setConfirmingItemKey] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Load initial partner data and warehouse location
  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      const [partnersRes, whRes] = await Promise.all([
        api.getDeliveryPartnersManagement(),
        api.getWarehouseLocation(),
      ]);

      let activePartner: IDeliveryPartner | null = null;
      if (partnersRes.success && partnersRes.partners.length > 0) {
        setAvailablePartners(partnersRes.partners);
        const matched = partnersRes.partners.find(
          (p) => p.phone === currentUser?.phone || p.name === currentUser?.name
        );
        activePartner = matched || partnersRes.partners[0];
        setPartner(activePartner);
      }

      if (whRes.success) {
        setWarehouseLocation(whRes.warehouse);
      }

      if (activePartner) {
        await fetchPickupsForPartner(activePartner);
      }
    } catch (err) {
      console.error('Failed to load delivery portal data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPickupsForPartner = async (p: IDeliveryPartner) => {
    try {
      const res = await api.getAssignedPickups({
        partnerId: p.partnerId,
        phone: p.phone,
      });
      if (res.success) {
        setPickups(res.pickups || []);
      }
    } catch (err) {
      console.error('Failed to fetch pickups:', err);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, [currentUser]);

  // Handle direct 1-click pickup confirmation
  const handleConfirmPickup = async (item: IPartnerPickupItem) => {
    const itemKey = item.uniqueId || `${item.orderId}-${item.productId || item.sku || item.barcode}`;
    setConfirmingItemKey(itemKey);
    setFeedbackMessage(null);

    try {
      const res = await api.confirmBarcodePickup({
        barcode: item.barcode,
        orderId: item.orderId,
        partnerId: partner?.partnerId || 'DP-101',
        partnerName: partner?.name || 'Delivery Partner',
        partnerPhone: partner?.phone || '9876543210',
      });

      if (res.success) {
        playScanSuccessBeep();
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.7 },
        });

        setFeedbackMessage({
          type: 'success',
          text: `✓ Successfully picked up ${item.productName} for ${item.customerName}!`,
        });

        // Update local pickup list instantly
        setPickups((prev) =>
          prev.map((p) => {
            const isMatch = p.uniqueId && item.uniqueId
              ? p.uniqueId === item.uniqueId
              : p.orderId === item.orderId && (p.productId === item.productId || p.sku === item.sku);
            return isMatch
              ? { ...p, isPicked: true, orderStatus: 'Picked Up', pickedAt: new Date().toISOString() }
              : p;
          })
        );

        // Background sync
        if (partner) {
          fetchPickupsForPartner(partner);
        }
      } else {
        playScanErrorBuzzer();
        setFeedbackMessage({
          type: 'error',
          text: res.message || 'Pickup confirmation failed. Please try again.',
        });
      }
    } catch (err: any) {
      playScanErrorBuzzer();
      setFeedbackMessage({
        type: 'error',
        text: err.message || 'Network error confirming pickup.',
      });
    } finally {
      setConfirmingItemKey(null);
    }
  };

  // Handle barcode scanned from camera modal
  const handleBarcodeScanned = (scannedCode: string) => {
    const clean = scannedCode.trim().toLowerCase();
    const matched =
      pickups.find(
        (p) =>
          !p.isPicked &&
          ((p.barcode && p.barcode.trim().toLowerCase() === clean) ||
            (p.orderId && p.orderId.trim().toLowerCase() === clean) ||
            (p.sku && p.sku.trim().toLowerCase() === clean) ||
            (p.productId && p.productId.trim().toLowerCase() === clean) ||
            (p.uniqueId && p.uniqueId.trim().toLowerCase() === clean))
      ) ||
      pickups.find(
        (p) =>
          (p.barcode && p.barcode.trim().toLowerCase() === clean) ||
          (p.orderId && p.orderId.trim().toLowerCase() === clean) ||
          (p.sku && p.sku.trim().toLowerCase() === clean) ||
          (p.productId && p.productId.trim().toLowerCase() === clean) ||
          (p.uniqueId && p.uniqueId.trim().toLowerCase() === clean)
      );

    if (matched) {
      handleConfirmPickup(matched);
      setFeedbackMessage({
        type: 'success',
        text: `Package verified: ${matched.productName} (${matched.orderId}). Picked up successfully!`,
      });
      setTargetedPickupItem(null);
    } else {
      playScanErrorBuzzer();
      setFeedbackMessage({
        type: 'error',
        text: `Barcode "${scannedCode}" does not match any packages on your pickup list.`,
      });
    }
  };

  // Copy warehouse address
  const handleCopyAddress = () => {
    if (!warehouseLocation) return;
    const text = `${warehouseLocation.name}, ${warehouseLocation.address}, ${warehouseLocation.city}`;
    navigator.clipboard.writeText(text);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  // Filtered pickups
  const filteredPickups = pickups.filter((item) => {
    if (statusFilter === 'pending' && item.isPicked) return false;
    if (statusFilter === 'completed' && !item.isPicked) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.productName?.toLowerCase().includes(q);
      const matchCustomer = item.customerName?.toLowerCase().includes(q);
      const matchOrder = item.orderId?.toLowerCase().includes(q);
      const matchBarcode = item.barcode?.toLowerCase().includes(q);
      const matchCity = item.deliveryCity?.toLowerCase().includes(q);
      if (!matchName && !matchCustomer && !matchOrder && !matchBarcode && !matchCity) {
        return false;
      }
    }
    return true;
  });

  const totalAssigned = pickups.length;
  const pendingCount = pickups.filter((p) => !p.isPicked).length;
  const completedCount = pickups.filter((p) => p.isPicked).length;

  const lat = warehouseLocation?.latitude || 19.2965;
  const lng = warehouseLocation?.longitude || 73.0631;
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 pt-4">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-5">
        {/* 1. MINIMAL, CLEAN HEADER */}
        <header className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black tracking-tight text-slate-900">
                  Delivery Partner Hub
                </h1>
                <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                  Daily Dispatch
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Simple package pickup checklist and warehouse loading instructions
              </p>
            </div>
          </div>

          {/* Driver Card & Switcher */}
          <div className="flex items-center gap-2">
            {partner && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowPartnerSwitcher(!showPartnerSwitcher)}
                  className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 text-xs transition-colors text-left"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-700 text-white font-bold text-[11px]">
                    {partner.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 flex items-center gap-1">
                      <span>{partner.name}</span>
                      <ChevronDown className="h-3 w-3 text-slate-400" />
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {partner.agency} • {partner.vehicleNumber}
                    </div>
                  </div>
                </button>

                {/* Partner Switcher Dropdown */}
                {showPartnerSwitcher && (
                  <div className="absolute right-0 mt-1.5 w-64 rounded-xl bg-white border border-slate-200 shadow-xl p-2 z-30 divide-y divide-slate-100">
                    <div>
                      <div className="px-2 py-1 text-[10px] uppercase font-bold text-slate-400">
                        Switch Driver Profile
                      </div>
                      <div className="pt-1 space-y-1 max-h-48 overflow-y-auto">
                        {availablePartners.map((p) => (
                          <button
                            key={p.partnerId}
                            type="button"
                            onClick={() => {
                              setPartner(p);
                              setShowPartnerSwitcher(false);
                              fetchPickupsForPartner(p);
                            }}
                            className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center justify-between ${
                              p.partnerId === partner.partnerId
                                ? 'bg-emerald-50 text-emerald-900 font-bold'
                                : 'hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <div>
                              <div className="font-bold">{p.name}</div>
                              <div className="text-[10px] text-slate-400">{p.agency}</div>
                            </div>
                            {p.partnerId === partner.partnerId && (
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick Portal Switch */}
                    {onSwitchPortal && (
                      <div className="pt-2 mt-1 space-y-1">
                        <div className="px-2 py-0.5 text-[10px] uppercase font-bold text-slate-400">
                          Other Portals
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setShowPartnerSwitcher(false);
                            onSwitchPortal('warehouse');
                          }}
                          className="w-full text-left px-2 py-1 rounded-lg text-xs flex items-center gap-2 hover:bg-slate-50 text-slate-700 font-medium"
                        >
                          <Building2 className="h-3.5 w-3.5 text-emerald-600" />
                          <span>Warehouse & Inventory</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowPartnerSwitcher(false);
                            onSwitchPortal('manufacturer');
                          }}
                          className="w-full text-left px-2 py-1 rounded-lg text-xs flex items-center gap-2 hover:bg-slate-50 text-slate-700 font-medium"
                        >
                          <Factory className="h-3.5 w-3.5 text-purple-600" />
                          <span>Manufacturer Portal</span>
                        </button>
                      </div>
                    )}

                    {onLogout && (
                      <div className="pt-1.5 mt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setShowPartnerSwitcher(false);
                            onLogout();
                          }}
                          className="w-full text-left px-2 py-1 rounded-lg text-xs flex items-center gap-2 text-rose-600 hover:bg-rose-50 font-bold"
                        >
                          <LogOut className="h-3.5 w-3.5" />
                          <span>Log Out</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                title="Log Out"
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-rose-50 hover:text-rose-600 px-3 py-2 text-xs font-bold text-slate-600 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            )}
          </div>
        </header>

        {/* 2. STATS BAR */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-xs">
            <div className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">
              Total Assigned
            </div>
            <div className="mt-1 text-xl sm:text-2xl font-black text-slate-900">
              {totalAssigned}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Today's Route</div>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-3 sm:p-4 shadow-xs">
            <div className="text-amber-700 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Pending Pickup</span>
            </div>
            <div className="mt-1 text-xl sm:text-2xl font-black text-amber-900">
              {pendingCount}
            </div>
            <div className="text-[11px] text-amber-700 mt-0.5">Need Loading</div>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-3 sm:p-4 shadow-xs">
            <div className="text-emerald-700 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              <span>Completed</span>
            </div>
            <div className="mt-1 text-xl sm:text-2xl font-black text-emerald-900">
              {completedCount}
            </div>
            <div className="text-[11px] text-emerald-700 mt-0.5">Loaded & Verified</div>
          </div>
        </div>

        {/* 3. SIMPLE NAVIGATION TABS */}
        <div className="flex border-b border-slate-200 gap-6">
          <button
            type="button"
            onClick={() => setActiveTab('pickups')}
            className={`pb-3 text-sm font-black border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'pickups'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Package className="h-4 w-4" />
            <span>Today's Pickups ({pickups.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('warehouse')}
            className={`pb-3 text-sm font-black border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'warehouse'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MapPin className="h-4 w-4" />
            <span>Warehouse & Dock Bay</span>
          </button>
        </div>

        {/* FEEDBACK BANNER */}
        {feedbackMessage && (
          <div
            className={`rounded-xl p-3.5 text-xs font-semibold flex items-center justify-between shadow-xs ${
              feedbackMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                : 'bg-rose-50 text-rose-900 border border-rose-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {feedbackMessage.type === 'success' ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
              )}
              <span>{feedbackMessage.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setFeedbackMessage(null)}
              className="text-slate-400 hover:text-slate-600 text-sm font-bold ml-2"
            >
              ✕
            </button>
          </div>
        )}

        {/* 4. TAB CONTENT 1: TODAY'S PICKUPS */}
        {activeTab === 'pickups' && (
          <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Search input */}
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search order, customer, or product..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* Status Filters & Scan Button */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex rounded-xl border border-slate-200 bg-white p-1 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setStatusFilter('all')}
                    className={`px-2.5 py-1 rounded-lg transition-colors ${
                      statusFilter === 'all'
                        ? 'bg-slate-900 text-white font-bold'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    All ({totalAssigned})
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFilter('pending')}
                    className={`px-2.5 py-1 rounded-lg transition-colors ${
                      statusFilter === 'pending'
                        ? 'bg-amber-600 text-white font-bold'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Pending ({pendingCount})
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFilter('completed')}
                    className={`px-2.5 py-1 rounded-lg transition-colors ${
                      statusFilter === 'completed'
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Picked ({completedCount})
                  </button>
                </div>

                {/* Barcode Camera Scanner Trigger */}
                <button
                  type="button"
                  onClick={() => setIsScannerOpen(true)}
                  className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 text-xs font-bold transition-all shadow-xs"
                >
                  <Camera className="h-3.5 w-3.5" />
                  <span>Scan Barcode</span>
                </button>

                <button
                  type="button"
                  onClick={() => partner && fetchPickupsForPartner(partner)}
                  title="Refresh Pickup List"
                  className="rounded-xl border border-slate-200 bg-white hover:bg-slate-100 p-2 text-slate-600 transition-colors"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Pickup List Cards */}
            {isLoading ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center animate-pulse">
                <div className="h-4 w-1/3 bg-slate-200 rounded mx-auto mb-3" />
                <div className="h-3 w-1/2 bg-slate-100 rounded mx-auto" />
              </div>
            ) : filteredPickups.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
                <Package className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700">No pickup orders match your filter</p>
                <p className="text-xs text-slate-400 mt-1">
                  Try clearing the search query or status filter.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredPickups.map((item, idx) => {
                  const itemKey = item.uniqueId || `${item.orderId}-${item.productId || item.sku || idx}`;
                  const isProcessing = confirmingItemKey === itemKey;
                  const binDisplay = item.location?.row
                    ? `${item.location.row} • ${item.location.bin}`
                    : (item.location?.bin || 'Warehouse Floor');

                  return (
                    <div
                      key={itemKey}
                      className={`rounded-2xl border p-4 sm:p-5 transition-all shadow-xs ${
                        item.isPicked
                          ? 'border-emerald-200 bg-emerald-50/20'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        {/* Left: Product & Customer info */}
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-xs font-bold text-slate-400">
                              #{item.orderId}
                            </span>
                            <span className="text-slate-300">•</span>
                            <h3 className="text-sm font-bold text-slate-900">
                              {item.productName}
                            </h3>
                            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-mono font-bold text-slate-600">
                              Qty: {item.quantity}
                            </span>
                          </div>

                          {/* Customer & Location */}
                          <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                            <span>To: <strong>{item.customerName}</strong> ({item.deliveryCity || 'Mumbai'})</span>
                            {item.deliveryAddress && (
                              <span className="hidden md:inline text-slate-400 truncate max-w-xs">
                                — {item.deliveryAddress}
                              </span>
                            )}
                          </div>

                          {/* Warehouse Shelf Location */}
                          <div className="pt-1 flex items-center gap-2 flex-wrap text-xs">
                            <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 border border-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-700">
                              <MapPin className="h-3 w-3 text-emerald-600" />
                              Shelf Bin: {binDisplay}
                            </span>

                            <span className="inline-flex items-center gap-1 rounded-lg bg-slate-50 border border-slate-200 px-2 py-0.5 text-[11px] font-mono text-slate-500">
                              <BarcodeIcon className="h-3 w-3 text-slate-400" />
                              {item.barcode}
                            </span>
                          </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-2 sm:self-center">
                          {item.isPicked ? (
                            <div className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-100/70 border border-emerald-200 px-3.5 py-2 text-xs font-bold text-emerald-800">
                              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                              <span>Picked Up</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              {/* Scan with Camera Button */}
                              <button
                                type="button"
                                onClick={() => {
                                  setTargetedPickupItem(item);
                                  setIsScannerOpen(true);
                                }}
                                title="Scan barcode with camera to verify this package"
                                className="flex items-center gap-1.5 rounded-xl border border-emerald-600/30 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 px-3 py-2 text-xs font-bold transition-all shadow-xs cursor-pointer"
                              >
                                <Camera className="h-3.5 w-3.5 text-emerald-600" />
                                <span className="hidden xs:inline">Scan</span>
                              </button>

                              {/* Direct Confirm Pickup Button */}
                              <button
                                type="button"
                                onClick={() => handleConfirmPickup(item)}
                                disabled={isProcessing}
                                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-3.5 py-2 text-xs font-bold transition-all shadow-xs cursor-pointer"
                              >
                                {isProcessing ? (
                                  <>
                                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                                    <span>Verifying...</span>
                                  </>
                                ) : (
                                  <>
                                    <Check className="h-3.5 w-3.5" />
                                    <span>Confirm</span>
                                  </>
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 5. TAB CONTENT 2: WAREHOUSE LOCATION & DOCK ACCESS */}
        {activeTab === 'warehouse' && (
          <div className="space-y-4">
            {warehouseLocation ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-6">
                {/* Facility Details */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base sm:text-lg font-black text-slate-900">
                        {warehouseLocation.name}
                      </h2>
                      <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                        Active Hub
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>{warehouseLocation.address}, {warehouseLocation.city}</span>
                    </p>
                  </div>

                  {/* Address Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyAddress}
                      className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 transition-colors"
                    >
                      {copiedAddress ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>

                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 text-xs font-bold transition-colors shadow-xs"
                    >
                      <Navigation className="h-3.5 w-3.5" />
                      <span>Open in Google Maps</span>
                      <ExternalLink className="h-3 w-3 opacity-80" />
                    </a>
                  </div>
                </div>

                {/* Dock Gate & Loading Bay Instructions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4 space-y-2">
                    <div className="text-[11px] uppercase font-bold text-slate-400">
                      Assigned Loading Bay
                    </div>
                    <div className="text-sm font-black text-slate-900">
                      Dock Bay #4 — South Logistics Gate
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Show your driver badge at Gate 2 security. Back your vehicle up to Bay #4.
                      The dispatch manager will verify the barcode scanned list and release the cargo.
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4 space-y-2">
                    <div className="text-[11px] uppercase font-bold text-slate-400">
                      Warehouse Operations
                    </div>
                    <div className="text-xs text-slate-700 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Dispatch Gate Hours:</span>
                        <span className="font-bold">08:00 AM – 09:00 PM</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Facility Manager:</span>
                        <span className="font-bold">Rajesh Verma</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Gate Assistance:</span>
                        <a
                          href="tel:+919820012345"
                          className="font-bold text-emerald-700 hover:underline flex items-center gap-1"
                        >
                          <Phone className="h-3 w-3" /> +91 98200 12345
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Safety & Compliance Notice */}
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-3.5 flex items-center gap-3 text-xs text-emerald-900">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>
                    Safety shoes and high-visibility vest required on the active loading dock area at all times.
                  </span>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
                <Building2 className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700">Warehouse information loading...</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 6. CAMERA BARCODE SCANNER MODAL */}
      <CameraScannerModal
        isOpen={isScannerOpen}
        onClose={() => {
          setIsScannerOpen(false);
          setTargetedPickupItem(null);
        }}
        onScan={(code) => {
          handleBarcodeScanned(code);
        }}
        title={
          targetedPickupItem
            ? `Scan: ${targetedPickupItem.productName}`
            : 'Scan Delivery Pickup Barcode'
        }
        expectedBarcode={targetedPickupItem?.barcode}
        expectedProductName={
          targetedPickupItem
            ? `${targetedPickupItem.productName} (${targetedPickupItem.orderId})`
            : undefined
        }
        quickCodes={pickups.map((p) => ({
          label: `${p.productName} (${p.orderId})`,
          code: p.barcode || p.orderId,
          hint: `${p.location?.row || 'Row'} • Bin ${p.location?.bin || 'Bin'} — ${
            p.isPicked ? '✓ Picked' : 'Pending'
          }`,
        }))}
      />
    </div>
  );
};
