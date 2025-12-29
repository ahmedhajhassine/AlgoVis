import React, { useEffect, useState } from 'react'

export default function ElementVisualizer({ array, highlightedIndices, sortedIndices, currentStep, totalSteps, foundIndex, checkedIndices }) {
  const isComplete = currentStep === totalSteps - 1

  const getElementColor = (index) => {
    // Priority order for coloring:
    // 1. Found (yellow) - for search algorithms
    // 2. Currently being processed/comparing (red/orange)
    // 3. Already processed/sorted (green)
    // 4. Checked but not found (purple) - for search algorithms
    // 5. Not yet processed (gray/dark)
    
    if (foundIndex === index) return 'bg-yellow-500'
    if (highlightedIndices && highlightedIndices.includes(index)) return 'bg-orange-500'
    if (sortedIndices && sortedIndices.includes(index)) return 'bg-green-500'
    if (checkedIndices && checkedIndices.includes(index)) return 'bg-purple-500'
    return 'bg-gray-600' // Not yet processed
  }

  const getElementBgStyle = (index) => {
    const color = getElementColor(index)
    if (color === 'bg-yellow-500') return 'from-yellow-600 to-yellow-400'
    if (color === 'bg-orange-500') return 'from-orange-600 to-orange-400'
    if (color === 'bg-green-500') return 'from-green-600 to-green-400'
    if (color === 'bg-purple-500') return 'from-purple-600 to-purple-400'
    return 'from-gray-700 to-gray-500' // Not yet processed - darker
  }

  const getOpacity = (index) => {
    // When complete, show all at full opacity
    if (isComplete) return 1
    
    // During execution:
    // - Currently processing: full opacity (bright)
    // - Processed/sorted: high opacity
    // - Not processed: lower opacity (dimmer)
    if (highlightedIndices && highlightedIndices.includes(index)) return 1
    if (foundIndex === index) return 1
    if (sortedIndices && sortedIndices.includes(index)) return 0.9
    if (checkedIndices && checkedIndices.includes(index)) return 0.75
    return 0.5 // Not yet processed - dimmer
  }

  return (
    <div className="glass rounded-xl p-8">
      <div className="flex flex-wrap gap-2 justify-center items-center min-h-32">
        {array.map((value, idx) => (
          <div
            key={idx}
            className={`
              flex items-center justify-center
              rounded-lg font-bold text-white
              transition-all duration-200
              cursor-default shadow-lg
              bg-gradient-to-br ${getElementBgStyle(idx)}
            `}
            style={{
              width: '50px',
              height: '50px',
              minWidth: '50px',
              minHeight: '50px',
              opacity: getOpacity(idx),
              transform: !isComplete && ((highlightedIndices && highlightedIndices.includes(idx)) || foundIndex === idx) ? 'scale(1.15)' : 'scale(1)',
              boxShadow: !isComplete && foundIndex === idx 
                ? '0 0 20px rgba(234,179,8,0.8)' 
                : !isComplete && highlightedIndices && highlightedIndices.includes(idx) 
                  ? '0 0 20px rgba(249,115,22,0.8)' 
                  : 'none',
            }}
          >
            {value}
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center text-sm text-gray-400">
        <span>Step: {currentStep + 1} / {totalSteps}</span>
        <span>Elements: {array.length}</span>
      </div>

      {!isComplete && (
        <div className="mt-4 p-3 bg-dark-700/50 rounded-lg border border-white/5">
          <p className="text-xs text-gray-400 mb-2 font-medium">Color Legend:</p>
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-orange-600 to-orange-400"></div>
              <span className="text-gray-300">Processing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-green-600 to-green-400"></div>
              <span className="text-gray-300">Processed/Sorted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-gray-700 to-gray-500 opacity-50"></div>
              <span className="text-gray-300">Not Yet Processed</span>
            </div>
            {checkedIndices && checkedIndices.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gradient-to-br from-purple-600 to-purple-400"></div>
                <span className="text-gray-300">Checked</span>
              </div>
            )}
            {foundIndex >= 0 && (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gradient-to-br from-yellow-600 to-yellow-400"></div>
                <span className="text-gray-300">Found</span>
              </div>
            )}
          </div>
        </div>
      )}

      {!isComplete && checkedIndices && checkedIndices.length > 0 && (
        <div className="mt-4 p-3 bg-dark-700 rounded-lg">
          <p className="text-xs text-gray-400 mb-2">Checked Elements: {checkedIndices.length} / {array.length}</p>
          <div className="w-full bg-dark-800 rounded-full h-2">
            <div
              className="bg-purple-500 h-2 rounded-full transition-all"
              style={{ width: `${(checkedIndices.length / array.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {isComplete && (
        <div className="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-center">
          <p className="text-green-400 font-semibold">✓ Algorithm Complete!</p>
        </div>
      )}
    </div>
  )
}
