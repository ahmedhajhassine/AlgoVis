import React, { useEffect, useState } from 'react'

export default function ElementVisualizer({ array, highlightedIndices, sortedIndices, currentStep, totalSteps, foundIndex, checkedIndices }) {
  const isComplete = currentStep === totalSteps - 1

  const getElementColor = (index) => {
    // Show colors during algorithm execution
    if (foundIndex === index) return 'bg-yellow-500'
    if (sortedIndices && sortedIndices.includes(index)) return 'bg-green-500'
    if (highlightedIndices && highlightedIndices.includes(index)) return 'bg-red-500'
    if (checkedIndices && checkedIndices.includes(index)) return 'bg-purple-500'
    return 'bg-blue-500'
  }

  const getElementBgStyle = (index) => {
    const color = getElementColor(index)
    if (color === 'bg-yellow-500') return 'from-yellow-600 to-yellow-400'
    if (color === 'bg-green-500') return 'from-green-600 to-green-400'
    if (color === 'bg-red-500') return 'from-red-600 to-red-400'
    if (color === 'bg-purple-500') return 'from-purple-600 to-purple-400'
    return 'from-blue-600 to-blue-400'
  }

  const getOpacity = (index) => {
    // When complete, show all blue at full opacity
    if (isComplete) return 1
    
    // During execution, show colors with proper opacity
    if (highlightedIndices && highlightedIndices.includes(index)) return 1
    if (foundIndex === index) return 1
    if (sortedIndices && sortedIndices.includes(index)) return 1
    if (checkedIndices && checkedIndices.includes(index)) return 0.7
    return 0.4
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
              boxShadow: !isComplete && foundIndex === idx ? '0 0 20px rgba(234,179,8,0.8)' : !isComplete && highlightedIndices && highlightedIndices.includes(idx) ? '0 0 20px rgba(239,68,68,0.8)' : 'none',
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
