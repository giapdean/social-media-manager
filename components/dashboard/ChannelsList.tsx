/**
 * Connected Channels List
 */
'use client';

import { useEffect, useState } from 'react';
import { useChannelsStore } from '@/lib/store';
import { channelsApi } from '@/lib/api';
import { getPlatformInfo } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function ChannelsList() {
  const { channels, setChannels, setLoading } = useChannelsStore();

  useEffect(() => {
    async function loadChannels() {
      try {
        const data = await channelsApi.list();
        setChannels(data);
      } catch (error) {
        console.error('Failed to load channels:', error);
      } finally {
        setLoading(false);
      }
    }
    loadChannels();
  }, [setChannels, setLoading]);

  const handleConnect = async (platform: string) => {
    try {
      const result = await channelsApi.connect(platform);
      // Open OAuth URL in new window
      window.open(result.auth_url, '_blank', 'width=600,height=600');
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  const platforms = [
    'facebook',
    'tiktok',
    'youtube',
    'instagram',
    'zalo',
    'pinterest',
    'threads',
  ] as const;

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Connected Channels</h2>
        <Button size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-1" />
          Add Channel
        </Button>
      </div>
      <div className="p-4 space-y-3">
        {platforms.map((platform) => {
          const connected = channels.find((c) => c.platform === platform && c.is_connected);
          const info = getPlatformInfo(platform);

          return (
            <div
              key={platform}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{info.icon}</span>
                <div>
                  <p className="font-medium text-sm">{info.name}</p>
                  <p className="text-xs text-gray-500">
                    {connected
                      ? `${connected.channel_name} • ${connected.follower_count?.toLocaleString() || 0} followers`
                      : 'Not connected'}
                  </p>
                </div>
              </div>
              {connected ? (
                <span className="text-xs text-green-600 font-medium">Connected</span>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleConnect(platform)}
                >
                  Connect
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
