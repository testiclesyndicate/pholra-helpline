import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Stethoscope,
  CheckCircle2,
  Droplets,
  Sun,
  Activity,
  Scan,
  ShieldAlert,
} from 'lucide-react';

export const HeroShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scan' | 'sensor'>('scan');

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 540, margin: '0 auto' }}>
      {/* Outer Glow Ring */}
      <div
        style={{
          position: 'absolute',
          inset: -12,
          background: 'radial-gradient(circle, rgba(46, 107, 69, 0.18) 0%, rgba(232, 160, 32, 0.1) 60%, transparent 80%)',
          filter: 'blur(20px)',
          borderRadius: 36,
          zIndex: 0,
        }}
      />

      {/* Main Glass Showcase Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'relative',
          zIndex: 1,
          borderRadius: 24,
          overflow: 'hidden',
          border: '1.5px solid rgba(255, 255, 255, 0.6)',
          boxShadow: '0 20px 50px rgba(29, 74, 47, 0.18)',
          background: 'var(--surface)',
        }}
      >
        {/* Main Agricultural Photo Container with AI Scan HUD */}
        <div style={{ position: 'relative', height: 290, overflow: 'hidden' }}>
          <img
            src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=900&auto=format&fit=crop&q=80"
            alt="Lush green paddy crop field under golden morning sunlight in India"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          {/* Futuristic Scanning Overlay Line */}
          <motion.div
            animate={{ y: [0, 270, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: 'linear-gradient(90deg, transparent, #f59e0b, #fbbf24, transparent)',
              boxShadow: '0 0 15px rgba(245, 158, 11, 0.9)',
              zIndex: 3,
            }}
          />

          {/* Gradient Darkness at bottom */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(36, 24, 15, 0.88) 100%)',
              zIndex: 2,
            }}
          />

          {/* Top Floating Badge */}
          <div
            style={{
              position: 'absolute',
              top: 14,
              left: 14,
              zIndex: 4,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 12px',
              borderRadius: 999,
              background: 'rgba(28, 19, 13, 0.82)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#f59e0b',
                boxShadow: '0 0 8px #f59e0b',
              }}
            />
            AI Agricultural Diagnostics · Live
          </div>

          {/* Bottom Overlay Info */}
          <div style={{ position: 'absolute', bottom: 14, left: 16, right: 16, zIndex: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#fde68a', textTransform: 'uppercase' }}>
                  Target Crop Analyzed
                </span>
                <h4 style={{ fontSize: 18, fontWeight: 800, color: '#ffffff', margin: '2px 0 0' }}>
                  Paddy / Basmati Rice (धान)
                </h4>
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  padding: '4px 10px',
                  borderRadius: 999,
                  background: '#f59e0b',
                  color: '#451a03',
                }}
              >
                Healthy · Stage: Tillering
              </span>
            </div>
          </div>
        </div>

        {/* Live Metrics Ribbon Below Photo */}
        <div
          style={{
            padding: '16px 18px',
            background: 'var(--surface)',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12,
            borderTop: '1px solid var(--line)',
          }}
        >
          {/* Metric 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--ink-soft)' }}>
              <Droplets size={14} color="#0ea5e9" />
              <span>Moisture</span>
            </div>
            <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)' }}>68% Normal</span>
          </div>

          {/* Metric 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--ink-soft)' }}>
              <Sun size={14} color="#eab308" />
              <span>Sunlight</span>
            </div>
            <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)' }}>8.4 hrs/day</span>
          </div>

          {/* Metric 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--ink-soft)' }}>
              <Activity size={14} color="var(--forest)" />
              <span>NDVI Index</span>
            </div>
            <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--forest)' }}>0.82 Optimal</span>
          </div>
        </div>
      </motion.div>

      {/* Floating Interactive Badge 1 (Top Right) */}
      <motion.div
        animate={{ y: [-4, 6, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: -16,
          right: -14,
          zIndex: 5,
          padding: '8px 14px',
          borderRadius: 14,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(46, 107, 69, 0.2)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'var(--leaf-light)',
            color: 'var(--forest)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Stethoscope size={16} />
        </div>
        <div>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: 'var(--forest)', textTransform: 'uppercase' }}>
            Instant Diagnosis
          </div>
          <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink)' }}>
            1-Click Disease Scan
          </div>
        </div>
      </motion.div>

      {/* Floating Interactive Badge 2 (Bottom Left) */}
      <motion.div
        animate={{ y: [6, -4, 6] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: 12,
          left: -18,
          zIndex: 5,
          padding: '8px 14px',
          borderRadius: 14,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(232, 160, 32, 0.3)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'var(--sun-light)',
            color: 'var(--sun-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Sparkles size={16} />
        </div>
        <div>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: 'var(--sun-dark)', textTransform: 'uppercase' }}>
            Voice & Multilingual
          </div>
          <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink)' }}>
            हिंदी · English · मराठी
          </div>
        </div>
      </motion.div>
    </div>
  );
};
