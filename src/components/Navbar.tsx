import React, { useState, useEffect } from 'react';
import {
  Database,
  RotateCcw,
  UserCheck,
  Layers,
  ChevronDown,
  Truck,
  Factory,
  LogOut,
  Building2,
  Boxes,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { api } from '../services/api.js';
import { IAuthUser } from '../types.js';

interface NavbarProps {
  onRefreshAll: () => void;
  activeRole: 'Operator' | 'Manager';
  onToggleRole: (role: 'Operator' | 'Manager') => void;
  activePortal?: 'manufacturer' | 'warehouse' | 'delivery';
  onOpenDeliveryPortal?: () => void;
  onOpenManufacturerPortal?: () => void;
  onSearchClick?: () => void;
  currentUser?: IAuthUser | null;
  onLogout?: () => void;
  onSwitchPortal?: (portal: 'manufacturer' | 'warehouse' | 'delivery') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onRefreshAll,
  activeRole,
  onToggleRole,
  activePortal = 'warehouse',
  onOpenDeliveryPortal,
  onOpenManufacturerPortal,
  currentUser,
  onLogout,
  onSwitchPortal,
}) => {
  const [dbStatus, setDbStatus] = useState<any>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [showPortalMenu, setShowPortalMenu] = useState(false);

  // Effective current portal
  const effectivePortal = activePortal;

  useEffect(() => {
    api
      .getHealth()
      .then((res) => {
        if (res.database) setDbStatus(res.database);
      })
      .catch((err) => console.warn('Health check error:', err));
  }, []);

  const handleResetDemo = async () => {
    if (confirm('Reset warehouse data to default records?')) {
      setIsResetting(true);
      try {
        await api.resetDemoData();
        onRefreshAll();
      } catch (err: any) {
        alert('Reset error: ' + err.message);
      } finally {
        setIsResetting(false);
      }
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-slate-200 bg-white px-3 sm:px-6 shadow-xs">
      {/* Brand & Tagline */}
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-xs">
          <Layers className="h-4.5 w-4.5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm sm:text-base tracking-wider text-slate-900">STOCKPILOT</span>
            <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
              v1.0
            </span>
          </div>
          <p className="hidden sm:block text-[11px] text-slate-800 font-bold -mt-0.5">
            {effectivePortal === 'delivery'
              ? 'Delivery Partner Dispatch & Route Portal'
              : effectivePortal === 'manufacturer'
              ? 'Manufacturer & Factory Dispatch Portal'
              : 'Warehouse Operations & Inventory Ecosystem'}
          </p>
        </div>
      </div>

      {/* Prominent Center Portal Switcher */}
      <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-2xs">
        <button
          type="button"
          onClick={() => onSwitchPortal?.('manufacturer')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            effectivePortal === 'manufacturer'
              ? 'bg-purple-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Factory className="h-3.5 w-3.5" />
          <span>Manufacturer</span>
          {effectivePortal === 'manufacturer' && (
            <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-amber-300 ring-2 ring-purple-400" />
          )}
        </button>

        <button
          type="button"
          onClick={() => onSwitchPortal?.('warehouse')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            effectivePortal === 'warehouse'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Building2 className="h-3.5 w-3.5" />
          <span>Warehouse & Inventory</span>
          {effectivePortal === 'warehouse' && (
            <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-300 ring-2 ring-emerald-400" />
          )}
        </button>

        <button
          type="button"
          onClick={() => onSwitchPortal?.('delivery')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            effectivePortal === 'delivery'
              ? 'bg-blue-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Truck className="h-3.5 w-3.5" />
          <span>Delivery Portal</span>
          {effectivePortal === 'delivery' && (
            <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-cyan-300 ring-2 ring-blue-400" />
          )}
        </button>
      </div>

      {/* Center / Right controls */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Active User / Portal Role Pill */}
        {currentUser ? (
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowPortalMenu(!showPortalMenu)}
              className="flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer shadow-xs"
            >
              <div className="flex items-center gap-1.5">
                {effectivePortal === 'manufacturer' ? (
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-purple-100 text-purple-900">
                    <Factory className="h-3.5 w-3.5" />
                  </span>
                ) : effectivePortal === 'delivery' ? (
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-100 text-blue-900">
                    <Truck className="h-3.5 w-3.5" />
                  </span>
                ) : (
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-100 text-emerald-900">
                    <Building2 className="h-3.5 w-3.5" />
                  </span>
                )}
                <div className="text-left leading-tight hidden sm:block">
                  <div className="font-black text-slate-950 truncate max-w-[130px]">{currentUser.name}</div>
                  <div className="text-[10px] text-slate-800 font-extrabold capitalize flex items-center gap-1">
                    <span>
                      {effectivePortal === 'manufacturer'
                        ? 'Manufacturer'
                        : effectivePortal === 'delivery'
                        ? 'Delivery Portal'
                        : 'Warehouse'}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                </div>
              </div>
              <ChevronDown className="h-3 w-3 text-slate-900" />
            </button>

            {/* Portal Switch Dropdown */}
            {showPortalMenu && (
              <div className="absolute right-0 mt-1.5 w-72 rounded-xl border border-slate-300 bg-white p-2 text-xs shadow-xl z-50 space-y-1">
                <div className="px-2 py-1 text-[11px] font-black uppercase tracking-wider text-slate-950 flex items-center justify-between">
                  <span>Switch Active Portal</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">Live</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (onSwitchPortal) onSwitchPortal('manufacturer');
                    setShowPortalMenu(false);
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center justify-between transition-colors ${
                    effectivePortal === 'manufacturer'
                      ? 'bg-purple-100 text-slate-950 font-black border border-purple-300'
                      : 'hover:bg-slate-100 text-slate-900 font-bold'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Factory className="h-4 w-4 text-purple-700" />
                    <div>
                      <div className="text-slate-950 font-extrabold flex items-center gap-1.5">
                        <span>Manufacturer Portal</span>
                        {effectivePortal === 'manufacturer' && (
                          <span className="text-[10px] bg-purple-700 text-white font-bold px-1.5 py-0.2 rounded-full">Active</span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-800 font-medium">Warehouse Vacancies & Dispatch</div>
                    </div>
                  </div>
                  {effectivePortal === 'manufacturer' && (
                    <CheckCircle2 className="h-4 w-4 text-purple-700" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onSwitchPortal) onSwitchPortal('warehouse');
                    setShowPortalMenu(false);
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center justify-between transition-colors ${
                    effectivePortal === 'warehouse'
                      ? 'bg-emerald-100 text-slate-950 font-black border border-emerald-300'
                      : 'hover:bg-slate-100 text-slate-900 font-bold'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-emerald-700" />
                    <div>
                      <div className="text-slate-950 font-extrabold flex items-center gap-1.5">
                        <span>Warehouse & Inventory</span>
                        {effectivePortal === 'warehouse' && (
                          <span className="text-[10px] bg-emerald-700 text-white font-bold px-1.5 py-0.2 rounded-full">Active</span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-800 font-medium">3D Model, Catalog & Stock Inward</div>
                    </div>
                  </div>
                  {effectivePortal === 'warehouse' && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onSwitchPortal) onSwitchPortal('delivery');
                    setShowPortalMenu(false);
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center justify-between transition-colors ${
                    effectivePortal === 'delivery'
                      ? 'bg-blue-100 text-slate-950 font-black border border-blue-300'
                      : 'hover:bg-slate-100 text-slate-900 font-bold'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-blue-600" />
                    <div>
                      <div className="text-slate-950 font-extrabold flex items-center gap-1.5">
                        <span>Delivery Partner Portal</span>
                        {effectivePortal === 'delivery' && (
                          <span className="text-[10px] bg-blue-700 text-white font-bold px-1.5 py-0.2 rounded-full">Active</span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-800 font-medium">Live Warehouse Route & Daily Pickups</div>
                    </div>
                  </div>
                  {effectivePortal === 'delivery' && (
                    <CheckCircle2 className="h-4 w-4 text-blue-700" />
                  )}
                </button>

                <div className="pt-1 border-t border-slate-100">
                  {onLogout && (
                    <button
                      type="button"
                      onClick={() => {
                        onLogout();
                        setShowPortalMenu(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 text-rose-600 hover:bg-rose-50 font-bold transition-colors"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>Log Out</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* When not logged in */
          <div className="flex items-center gap-2">
            {onOpenManufacturerPortal && (
              <button
                type="button"
                onClick={onOpenManufacturerPortal}
                className="hidden sm:flex items-center gap-1.5 rounded-lg border border-purple-200 bg-purple-50 text-purple-700 px-2.5 py-1.5 text-xs font-bold hover:bg-purple-100"
              >
                <Factory className="h-3.5 w-3.5" />
                <span>Manufacturer</span>
              </button>
            )}
            {onOpenDeliveryPortal && (
              <button
                type="button"
                onClick={onOpenDeliveryPortal}
                className="hidden sm:flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 px-2.5 py-1.5 text-xs font-bold hover:bg-emerald-100"
              >
                <Truck className="h-3.5 w-3.5" />
                <span>Delivery</span>
              </button>
            )}
          </div>
        )}

        {/* Database Status Pill (Hidden for Delivery Partner) */}
        {currentUser?.role !== 'delivery' && (
          <div className="hidden lg:flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs text-slate-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <Database className="h-3 w-3 text-slate-500" />
            <span className="font-mono text-[11px] font-medium">
              MongoDB {dbStatus?.isEmbedded ? '(Live)' : '(Connected)'}
            </span>
          </div>
        )}

        {/* Reset Database Button (Hidden for Delivery Partner) */}
        {currentUser?.role !== 'delivery' && (
          <button
            type="button"
            onClick={handleResetDemo}
            disabled={isResetting}
            title="Reset database to default seed data"
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-xs"
          >
            <RotateCcw className={`h-3.5 w-3.5 ${isResetting ? 'animate-spin text-emerald-600' : 'text-slate-500'}`} />
            <span className="hidden xl:inline">{isResetting ? 'Resetting...' : 'Reset Data'}</span>
          </button>
        )}
      </div>
    </header>
  );
};
