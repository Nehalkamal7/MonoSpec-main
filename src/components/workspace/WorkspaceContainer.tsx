'use client';

import React from 'react';
import { useMonoSpecStore } from '@/store/useMonoSpecStore';
import { ChatWorkspace } from './ChatWorkspace';
import { SpecCanvas } from './SpecCanvas';

export function WorkspaceContainer() {
  const { canvasViewMode } = useMonoSpecStore();

  return (
    <div className="flex-1 flex overflow-hidden h-full">
      {/* Chat Workspace Section */}
      {(canvasViewMode === 'split' || canvasViewMode === 'chat-only') && (
        <div
          className={`${
            canvasViewMode === 'chat-only' ? 'w-full' : 'w-full lg:w-[42%] max-w-xl'
          } h-full flex flex-col shrink-0`}
        >
          <ChatWorkspace />
        </div>
      )}

      {/* Spec Canvas Section */}
      {(canvasViewMode === 'split' || canvasViewMode === 'canvas-only') && (
        <div className="flex-1 h-full flex flex-col overflow-hidden min-w-0">
          <SpecCanvas />
        </div>
      )}
    </div>
  );
}
