const GraphEngine = (() => {

  const DARK_LAYOUT = {
    paper_bgcolor: '#161d2e',
    plot_bgcolor:  '#111827',
    font: {
      family: "'Inter', sans-serif",
      color: '#94a3b8',
      size: 12,
    },
    margin: { t: 30, r: 20, b: 45, l: 55 },
    xaxis: {
      gridcolor: '#1e2a3a',
      zerolinecolor: '#2d3d50',
      tickcolor: '#64748b',
      linecolor: '#1e2a3a',
      title: { text: 'x', font: { color: '#64748b' } },
    },
    yaxis: {
      gridcolor: '#1e2a3a',
      zerolinecolor: '#2d3d50',
      tickcolor: '#64748b',
      linecolor: '#1e2a3a',
      title: { text: 'y', font: { color: '#64748b' } },
    },
    legend: {
      bgcolor: 'rgba(22,29,46,0.8)',
      bordercolor: '#1e2a3a',
      borderwidth: 1,
      font: { color: '#94a3b8', size: 11 },
    },
    hovermode: 'x unified',
    hoverlabel: {
      bgcolor: '#1e293b',
      bordercolor: '#3b82f6',
      font: { color: '#f1f5f9', family: "'JetBrains Mono', monospace", size: 12 },
    },
  };

  const PLOTLY_CONFIG = {
    responsive: true,
    displayModeBar: true,
    modeBarButtonsToRemove: ['select2d', 'lasso2d', 'autoScale2d', 'toImage'],
    displaylogo: false,
    scrollZoom: true,
  };

  function makeLayout(overrides = {}) {
    return _deepMerge({}, DARK_LAYOUT, overrides);
  }

  function _deepMerge(target, ...sources) {
    for (const source of sources) {
      for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
          target[key] = _deepMerge(target[key] || {}, source[key]);
        } else {
          target[key] = source[key];
        }
      }
    }
    return target;
  }

  function initResizeHandler() {
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        document.querySelectorAll('.js-plotly-plot').forEach(el => {
          if (el && el.layout) Plotly.Plots.resize(el);
        });
      }, 150);
    });
  }

  /**
   * Plot a single function f(x)
   * @param {string} containerId
   * @param {{ x: number[], y: number[] }} data
   * @param {string} label
   */
  function plotFunction(containerId, data, label = 'f(x)') {
    const trace = {
      x: data.x,
      y: data.y,
      type: 'scatter',
      mode: 'lines',
      name: label,
      line: { color: '#3b82f6', width: 2.5, shape: 'spline', smoothing: 0.5 },
      hovertemplate: `<b>${label}</b><br>x = %{x:.3f}<br>y = %{y:.4f}<extra></extra>`,
      connectgaps: false,
    };

    const layout = makeLayout({
      title: { text: label, font: { color: '#60a5fa', size: 14 }, x: 0.5 },
    });

    Plotly.newPlot(containerId, [trace], layout, PLOTLY_CONFIG);
    return containerId;
  }

  /**
   * Plot original function, its derivative, and optionally a tangent line
   * @param {string} containerId
   * @param {{ x: number[], y: number[] }} fnData
   * @param {{ x: number[], y: number[] }} derivData
   * @param {object|null} tangentData
   * @param {string} fnLabel
   * @param {string} derivLabel
   */
  function plotDerivative(containerId, fnData, derivData, tangentData = null, fnLabel = 'f(x)', derivLabel = "f'(x)") {
    const traces = [
      {
        x: fnData.x, y: fnData.y,
        type: 'scatter', mode: 'lines',
        name: fnLabel,
        line: { color: '#3b82f6', width: 2.5 },
        hovertemplate: `<b>${fnLabel}</b>: %{y:.4f}<extra></extra>`,
        connectgaps: false,
      },
      {
        x: derivData.x, y: derivData.y,
        type: 'scatter', mode: 'lines',
        name: derivLabel,
        line: { color: '#8b5cf6', width: 2, dash: 'dot' },
        hovertemplate: `<b>${derivLabel}</b>: %{y:.4f}<extra></extra>`,
        connectgaps: false,
      },
    ];

    if (tangentData) {
      traces.push({
        x: tangentData.xRange,
        y: tangentData.yRange,
        type: 'scatter',
        mode: 'lines+markers',
        name: `Tangent at x=${tangentData.x0?.toFixed(2)}`,
        line: { color: '#f59e0b', width: 2 },
        marker: { color: '#f59e0b', size: 8 },
        hovertemplate: `<b>Tangent</b>: slope = ${tangentData.slope?.toFixed(4)}<extra></extra>`,
      });
    }

    const layout = makeLayout({
      title: { text: 'Function & Derivative', font: { color: '#60a5fa', size: 14 }, x: 0.5 },
    });

    Plotly.newPlot(containerId, traces, layout, PLOTLY_CONFIG);
  }

  /**
   * Update tangent line on existing graph (avoid full re-render)
   * @param {string} containerId
   * @param {object} tangentData
   * @param {number} traceIndex - index of tangent trace
   */
  function updateTangent(containerId, tangentData, traceIndex = 2) {
    const el = document.getElementById(containerId);
    if (!el || !el.data || el.data.length <= traceIndex) {
      return;
    }
    Plotly.restyle(containerId, {
      x: [tangentData.xRange],
      y: [tangentData.yRange],
    }, traceIndex);
  }

  /**
   * Plot function with shaded area under the curve between a and b
   * @param {string} containerId
   * @param {{ x: number[], y: number[] }} fnData
   * @param {{ x: number[], y: number[] }} fillData
   * @param {number} a
   * @param {number} b
   * @param {string} fnLabel
   */
  function plotIntegral(containerId, fnData, fillData, a, b, fnLabel = 'f(x)') {
    const traces = [
      {
        // Shaded area (fill)
        x: fillData.x, y: fillData.y,
        type: 'scatter',
        mode: 'none',
        fill: 'tozeroy',
        fillcolor: 'rgba(59,130,246,0.15)',
        name: `∫${a} to ${b}`,
        hoverinfo: 'skip',
      },
      {
        // Function curve
        x: fnData.x, y: fnData.y,
        type: 'scatter', mode: 'lines',
        name: fnLabel,
        line: { color: '#3b82f6', width: 2.5 },
        hovertemplate: `<b>${fnLabel}</b>: %{y:.4f}<extra></extra>`,
        connectgaps: false,
      },
      {
        // Bound markers
        x: [a, b], y: [0, 0],
        type: 'scatter', mode: 'markers',
        name: 'Bounds',
        marker: { color: '#f59e0b', size: 10, symbol: 'diamond' },
        hovertemplate: 'x = %{x}<extra></extra>',
      }
    ];

    const layout = makeLayout({
      title: { text: `Area from x=${a} to x=${b}`, font: { color: '#60a5fa', size: 14 }, x: 0.5 },
    });

    Plotly.newPlot(containerId, traces, layout, PLOTLY_CONFIG);
  }

  /**
   * Plot sigma summation as a bar chart showing each term
   * @param {string} containerId
   * @param {Array<{i: number, value: number, cumulative: number}>} steps
   * @param {string} expr
   */
  function plotSigma(containerId, steps, expr = '') {
    const iVals = steps.map(s => s.i);
    const vals  = steps.map(s => s.value);
    const cumulative = steps.map(s => s.cumulative);

    const traces = [
      {
        x: iVals, y: vals,
        type: 'bar',
        name: `f(i)`,
        marker: {
          color: vals.map(v => v >= 0 ? 'rgba(59,130,246,0.7)' : 'rgba(239,68,68,0.7)'),
          line: { color: vals.map(v => v >= 0 ? '#3b82f6' : '#ef4444'), width: 1 },
        },
        hovertemplate: `i = %{x}<br>f(i) = %{y:.4f}<extra></extra>`,
      },
      {
        x: iVals, y: cumulative,
        type: 'scatter', mode: 'lines+markers',
        name: 'Cumulative Sum',
        yaxis: 'y2',
        line: { color: '#10b981', width: 2 },
        marker: { color: '#10b981', size: 6 },
        hovertemplate: `Σ up to i=%{x}: %{y:.4f}<extra></extra>`,
      }
    ];

    const layout = makeLayout({
      title: { text: `Σ f(i) = ${expr}`, font: { color: '#60a5fa', size: 13 }, x: 0.5 },
      xaxis: { title: { text: 'i' }, dtick: 1 },
      yaxis: { title: { text: 'f(i)' } },
      yaxis2: {
        title: { text: 'Cumulative', font: { color: '#10b981' } },
        overlaying: 'y',
        side: 'right',
        gridcolor: 'transparent',
        tickcolor: '#10b981',
        tickfont: { color: '#10b981' },
      },
      barmode: 'relative',
    });

    Plotly.newPlot(containerId, traces, layout, PLOTLY_CONFIG);
  }

  /**
   * Plot a histogram + optional normal distribution overlay
   * @param {string} containerId
   * @param {number[]} data
   * @param {object} stats - { mean, stdDev }
   */
  function plotHistogram(containerId, data, stats = {}) {
    const traces = [
      {
        x: data,
        type: 'histogram',
        name: 'Distribution',
        marker: {
          color: 'rgba(59,130,246,0.65)',
          line: { color: '#3b82f6', width: 1 },
        },
        autobinx: true,
        hovertemplate: 'Range: %{x}<br>Count: %{y}<extra></extra>',
      },
    ];

    const layout = makeLayout({
      title: { text: 'Data Distribution', font: { color: '#60a5fa', size: 14 }, x: 0.5 },
      xaxis: { title: { text: 'Value' } },
      yaxis: { title: { text: 'Frequency' } },
      bargap: 0.05,
      hovermode: 'closest',
      shapes: stats.mean !== undefined ? [
        {
          type: 'line',
          x0: stats.mean, x1: stats.mean,
          y0: 0, y1: 1, yref: 'paper',
          line: { color: '#10b981', width: 2, dash: 'dash' },
        }
      ] : [],
      annotations: stats.mean !== undefined ? [
        {
          x: stats.mean, y: 1, yref: 'paper',
          text: `Mean: ${stats.mean.toFixed(3)}`,
          showarrow: false,
          font: { color: '#10b981', size: 11 },
          xanchor: 'left',
          yanchor: 'top',
        }
      ] : [],
    });

    Plotly.newPlot(containerId, traces, layout, PLOTLY_CONFIG);
  }

  function plotBoxPlot(containerId, data) {
    const traces = [{
      y: data,
      type: 'box',
      name: 'Dataset',
      boxpoints: 'outliers',
      marker: { color: '#3b82f6', size: 5 },
      line: { color: '#60a5fa' },
      fillcolor: 'rgba(59,130,246,0.1)',
      hovertemplate: 'Value: %{y:.4f}<extra></extra>',
    }];

    const layout = makeLayout({
      title: { text: 'Box Plot', font: { color: '#60a5fa', size: 14 }, x: 0.5 },
      yaxis: { title: { text: 'Value' } },
      hovermode: 'closest',
    });

    Plotly.newPlot(containerId, traces, layout, PLOTLY_CONFIG);
  }

  function clearGraph(containerId) {
    const el = document.getElementById(containerId);
    if (el) Plotly.purge(el);
  }

  return {
    initResizeHandler,
    plotFunction,
    plotDerivative,
    updateTangent,
    plotIntegral,
    plotSigma,
    plotHistogram,
    plotBoxPlot,
    clearGraph,
    makeLayout,
    PLOTLY_CONFIG,
  };

})();

window.GraphEngine = GraphEngine;
