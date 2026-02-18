import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date
 */
export function formatDate(date: Date | number | string, format: 'short' | 'long' | 'time' = 'short'): string {
  const d = typeof date === 'number' ? new Date(date * 1000) : new Date(date);

  if (format === 'short') {
    return d.toLocaleDateString();
  }

  if (format === 'long') {
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  if (format === 'time') {
    return d.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return d.toLocaleDateString();
}

/**
 * Format a timestamp to relative time
 */
export function formatRelativeTime(timestamp: number): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - timestamp;

  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return formatDate(timestamp);
}

/**
 * Truncate text
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Get platform icon/name
 */
export function getPlatformInfo(platform: string) {
  const platforms: Record<string, { name: string; icon: string; color: string }> = {
    facebook: { name: 'Facebook', icon: '📘', color: '#1877F2' },
    tiktok: { name: 'TikTok', icon: '🎵', color: '#000000' },
    youtube: { name: 'YouTube', icon: '▶️', color: '#FF0000' },
    instagram: { name: 'Instagram', icon: '📷', color: '#E4405F' },
    zalo: { name: 'Zalo', icon: '💬', color: '#0068FF' },
    pinterest: { name: 'Pinterest', icon: '📌', color: '#E60023' },
    threads: { name: 'Threads', icon: '🧵', color: '#000000' },
  };

  return platforms[platform] || { name: platform, icon: '📱', color: '#666666' };
}

/**
 * Format number with K/M suffix
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

/**
 * Generate a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Sleep for ms milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Debounce a function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Check if code is running on client side
 */
export function isClient(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!isClient()) return false;

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * Download a file
 */
export function downloadFile(data: string, filename: string, type: string = 'text/plain'): void {
  if (!isClient()) return;

  const blob = new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
