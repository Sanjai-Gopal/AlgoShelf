import { useState } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  PlusCircle,
  Trash2,
  ListPlus,
  AlertCircle,
} from "lucide-react";

export default function LinkedListControls({
  nodesCount,
  activeTab,
  setActiveTab,
  inputValue,
  setInputValue,
  indexValue,
  setIndexValue,
  error,
  isPlaying,
  speed,
  setSpeed,
  currentStepIndex,
  totalSteps,
  executeInsert,
  executeDelete,
  stepForward,
  stepBackward,
  togglePlay,
  handleResetList,
  handleClearList,
}) {
  const [insertPos, setInsertPos] = useState("head"); // 'head' | 'tail' | 'position'
  const [deletePos, setDeletePos] = useState("head"); // 'head' | 'tail' | 'position'

  const onExecute = () => {
    if (activeTab === "insert") {
      executeInsert(insertPos);
    } else {
      executeDelete(deletePos);
    }
  };

  return (
    <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
      {/* Tabs: Insert vs Delete */}
      <div className="flex border-b border-[#EEE5DB] pb-4">
        <button
          type="button"
          onClick={() => setActiveTab("insert")}
          className={`flex items-center gap-2 border-b-2 px-5 py-2.5 text-sm font-semibold transition-all ${
            activeTab === "insert"
              ? "border-[#A1764E] text-[#8B5A2B]"
              : "border-transparent text-[#8C837B] hover:text-[#1F1B18]"
          }`}
        >
          <PlusCircle size={16} />
          Insertion Operations
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("delete")}
          className={`flex items-center gap-2 border-b-2 px-5 py-2.5 text-sm font-semibold transition-all ${
            activeTab === "delete"
              ? "border-[#C84B31] text-[#9E2A2B]"
              : "border-transparent text-[#8C837B] hover:text-[#1F1B18]"
          }`}
        >
          <Trash2 size={16} />
          Deletion Operations
        </button>
      </div>

      {/* Operation Form */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Left: Inputs */}
        <div className="space-y-4">
          {activeTab === "insert" && (
            <div>
              <label
                htmlFor="node-val-input"
                className="block text-xs font-semibold uppercase tracking-wider text-[#6B5B4D]"
              >
                Node Value (number)
              </label>
              <input
                id="node-val-input"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="e.g. 50"
                className="mt-1.5 w-full rounded-xl border border-[#E8DDD1] bg-[#FCFBF8] px-4 py-2.5 font-mono text-base font-semibold text-[#1F1B18] shadow-xs focus:border-[#A1764E] focus:outline-none focus:ring-1 focus:ring-[#A1764E]"
              />
            </div>
          )}

          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-[#6B5B4D]">
              Target Position
            </span>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => (activeTab === "insert" ? setInsertPos("head") : setDeletePos("head"))}
                className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
                  (activeTab === "insert" ? insertPos : deletePos) === "head"
                    ? "border-[#A1764E] bg-[#F7F2EA] text-[#8B5A2B] shadow-xs"
                    : "border-[#E8DDD1] bg-white text-[#6B5B4D] hover:bg-[#FDFBF7]"
                }`}
              >
                Beginning (Head)
              </button>
              <button
                type="button"
                onClick={() => (activeTab === "insert" ? setInsertPos("tail") : setDeletePos("tail"))}
                className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
                  (activeTab === "insert" ? insertPos : deletePos) === "tail"
                    ? "border-[#A1764E] bg-[#F7F2EA] text-[#8B5A2B] shadow-xs"
                    : "border-[#E8DDD1] bg-white text-[#6B5B4D] hover:bg-[#FDFBF7]"
                }`}
              >
                End (Tail)
              </button>
              <button
                type="button"
                onClick={() => (activeTab === "insert" ? setInsertPos("position") : setDeletePos("position"))}
                className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
                  (activeTab === "insert" ? insertPos : deletePos) === "position"
                    ? "border-[#A1764E] bg-[#F7F2EA] text-[#8B5A2B] shadow-xs"
                    : "border-[#E8DDD1] bg-white text-[#6B5B4D] hover:bg-[#FDFBF7]"
                }`}
              >
                Custom Index
              </button>
            </div>
          </div>

          {(activeTab === "insert" ? insertPos : deletePos) === "position" && (
            <div>
              <label
                htmlFor="node-idx-input"
                className="block text-xs font-semibold uppercase tracking-wider text-[#6B5B4D]"
              >
                Index (0 to {activeTab === "insert" ? nodesCount : Math.max(0, nodesCount - 1)})
              </label>
              <input
                id="node-idx-input"
                type="number"
                min="0"
                max={activeTab === "insert" ? nodesCount : Math.max(0, nodesCount - 1)}
                value={indexValue}
                onChange={(e) => setIndexValue(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#E8DDD1] bg-[#FCFBF8] px-4 py-2 font-mono text-sm font-semibold text-[#1F1B18] shadow-xs focus:border-[#A1764E] focus:outline-none"
              />
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-[#FDF2F0] p-3 text-xs font-semibold text-[#9E2A2B]">
              <AlertCircle size={15} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="button"
            onClick={onExecute}
            className={`w-full rounded-xl py-3 text-sm font-semibold text-white shadow-sm transition-all ${
              activeTab === "insert"
                ? "bg-[#9D7653] hover:bg-[#8A6645] active:scale-[0.99]"
                : "bg-[#B84A39] hover:bg-[#A33D2D] active:scale-[0.99]"
            }`}
          >
            {activeTab === "insert" ? "Execute Insertion" : "Execute Deletion"}
          </button>
        </div>

        {/* Right: Animation Step Controls & Presets */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#EEE5DB] bg-[#FCFBF8] p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#A1764E]">
              Playback Controls
            </p>

            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={stepBackward}
                disabled={currentStepIndex <= 0}
                className="rounded-xl border border-[#E8DDD1] bg-white p-2.5 text-[#6B5B4D] shadow-xs transition-all hover:bg-[#F7F2EA] disabled:opacity-40"
                title="Previous step"
              >
                <SkipBack size={18} />
              </button>

              <button
                type="button"
                onClick={togglePlay}
                disabled={totalSteps <= 0}
                className="flex items-center gap-2 rounded-xl bg-[#9D7653] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#8A6645] disabled:opacity-40"
              >
                {isPlaying ? <Pause size={17} /> : <Play size={17} />}
                <span>{isPlaying ? "Pause" : "Play"}</span>
              </button>

              <button
                type="button"
                onClick={stepForward}
                disabled={totalSteps <= 0 || currentStepIndex >= totalSteps - 1}
                className="rounded-xl border border-[#E8DDD1] bg-white p-2.5 text-[#6B5B4D] shadow-xs transition-all hover:bg-[#F7F2EA] disabled:opacity-40"
                title="Next step"
              >
                <SkipForward size={18} />
              </button>
            </div>

            {/* Speed slider */}
            <div className="mt-5">
              <div className="flex justify-between text-xs font-semibold text-[#8C837B]">
                <span>Speed</span>
                <span>{speed === 1300 ? "Slow" : speed === 900 ? "Normal" : "Fast"}</span>
              </div>
              <input
                type="range"
                min="400"
                max="1400"
                step="200"
                value={1800 - speed}
                onChange={(e) => setSpeed(1800 - Number(e.target.value))}
                className="mt-2 w-full accent-[#A1764E]"
              />
            </div>
          </div>

          {/* Presets & Reset */}
          <div className="mt-6 border-t border-[#EEE5DB] pt-4">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleResetList}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#E8DDD1] bg-white py-2 text-xs font-semibold text-[#6B5B4D] shadow-xs transition-all hover:bg-[#F7F2EA]"
              >
                <RotateCcw size={14} />
                Reset Sample
              </button>
              <button
                type="button"
                onClick={handleClearList}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#E8DDD1] bg-white py-2 text-xs font-semibold text-[#6B5B4D] shadow-xs transition-all hover:bg-[#F7F2EA]"
              >
                <ListPlus size={14} />
                Clear List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
