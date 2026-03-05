const MathEngine = (() => {
  const _math = window.math;
  if (!_math) {
    console.error(
      "[MathEngine] math.js not found. Please include it before math-engine.js",
    );
  }

  /**
   * Evaluate a math expression at a given x value
   * @param {string} expr - Math expression (e.g. "x^2 + 3*x + 1")
   * @param {number} x    - Value of x
   * @returns {number}
   */
  function evaluate(expr, x = 0) {
    try {
      const cleanExpr = preprocessExpression(expr);
      return _math.evaluate(cleanExpr, { x });
    } catch (e) {
      return NaN;
    }
  }

  /**
   * Evaluate an expression over a range of x values
   * @param {string} expr
   * @param {number} xMin
   * @param {number} xMax
   * @param {number} steps
   * @returns {{ x: number[], y: number[] }}
   */
  function evaluateRange(expr, xMin = -10, xMax = 10, steps = 400) {
    const xVals = [];
    const yVals = [];
    const step = (xMax - xMin) / steps;

    for (let i = 0; i <= steps; i++) {
      const xVal = xMin + i * step;
      const yVal = evaluate(expr, xVal);
      xVals.push(xVal);
      yVals.push(isFinite(yVal) ? yVal : null);
    }

    return { x: xVals, y: yVals };
  }

  /**
   * Pre-process expression: handle implicit multiplication, exponent notation
   * @param {string} expr
   * @returns {string}
   */
  function preprocessExpression(expr) {
    return expr
      .replace(/\^/g, "^") 
      .replace(/(\d)(x)/g, "$1*$2") 
      .replace(/(x)(\d)/g, "$1*$2") 
      .trim();
  }

  /**
   * Compute the symbolic derivative of an expression w.r.t. x
   * @param {string} expr
   * @returns {{ derivative: string, fn: Function, error: string|null }}
   */
  function derivative(expr) {
    try {
      const cleanExpr = preprocessExpression(expr);
      const node = _math.parse(cleanExpr);
      const derivNode = _math.derivative(node, "x");
      const derivStr = derivNode.toString({
        parenthesis: "auto",
        implicit: "hide",
      });
      const derivFn = derivNode.compile();

      return {
        derivative: derivStr,
        fn: (x) => {
          try {
            return derivFn.evaluate({ x });
          } catch {
            return NaN;
          }
        },
        error: null,
      };
    } catch (e) {
      return { derivative: null, fn: null, error: e.message };
    }
  }

  /**
   * Compute numerical derivative at a point (fallback, finite differences)
   * @param {string} expr
   * @param {number} x
   * @param {number} h - step size
   * @returns {number}
   */
  function numericalDerivative(expr, x, h = 1e-7) {
    return (evaluate(expr, x + h) - evaluate(expr, x - h)) / (2 * h);
  }

  /**
   * Get tangent line data at a specific x value
   * @param {string} expr
   * @param {number} x0
   * @returns {{ slope: number, yIntercept: number, xRange: number[], yRange: number[] }}
   */
  function tangentLine(expr, x0) {
    const y0 = evaluate(expr, x0);
    const slope = numericalDerivative(expr, x0);
    const yIntercept = y0 - slope * x0;
    const span = 3;
    const xRange = [x0 - span, x0 + span];
    const yRange = [
      slope * (x0 - span) + yIntercept,
      slope * (x0 + span) + yIntercept,
    ];

    return { slope, y0, yIntercept, xRange, yRange };
  }

  /**
   * Numerical integration using Simpson's rule (14th order composite)
   * @param {string} expr
   * @param {number} a - lower bound
   * @param {number} b - upper bound
   * @param {number} n - number of intervals (must be even)
   * @returns {{ result: number, error: string|null }}
   */
  function definiteIntegral(expr, a, b, n = 1000) {
    try {
      if (n % 2 !== 0) n++;
      const h = (b - a) / n;
      let sum = evaluate(expr, a) + evaluate(expr, b);

      for (let i = 1; i < n; i++) {
        const xVal = a + i * h;
        sum += (i % 2 === 0 ? 2 : 4) * evaluate(expr, xVal);
      }

      return { result: (h / 3) * sum, error: null };
    } catch (e) {
      return { result: NaN, error: e.message };
    }
  }

  /**
   * Get area-fill data for definite integral visualization
   * @param {string} expr
   * @param {number} a
   * @param {number} b
   * @param {number} steps
   * @returns {{ x: number[], y: number[] }}
   */
  function integralFillData(expr, a, b, steps = 200) {
    const xVals = [];
    const yVals = [];
    const step = (b - a) / steps;

    xVals.push(a);
    yVals.push(0);

    for (let i = 0; i <= steps; i++) {
      const xVal = a + i * step;
      const yVal = evaluate(expr, xVal);
      xVals.push(xVal);
      yVals.push(isFinite(yVal) ? yVal : 0);
    }

    xVals.push(b);
    yVals.push(0);

    return { x: xVals, y: yVals };
  }

  /**
   * Attempt symbolic indefinite integral (using math.js — limited support)
   * Returns a friendly message if not possible
   * @param {string} expr
   * @returns {string}
   */
  function indefiniteIntegral(expr) {
    const patterns = [
      {
        match: /^x\^(\d+)$/,
        result: (m) => `x^${parseInt(m[1]) + 1} / ${parseInt(m[1]) + 1} + C`,
      },
      {
        match: /^(\d+)\*?x\^(\d+)$/,
        result: (m) =>
          `${m[1]}*x^${parseInt(m[2]) + 1} / ${parseInt(m[2]) + 1} + C`,
      },
      { match: /^x$/, result: () => "x² / 2 + C" },
      { match: /^(\d+)$/, result: (m) => `${m[1]}x + C` },
      { match: /^sin\(x\)$/, result: () => "-cos(x) + C" },
      { match: /^cos\(x\)$/, result: () => "sin(x) + C" },
      { match: /^e\^x$/, result: () => "e^x + C" },
      { match: /^1\/x$/, result: () => "ln|x| + C" },
    ];

    const clean = expr.trim().replace(/\s/g, "");
    for (const p of patterns) {
      const m = clean.match(p.match);
      if (m) return p.result(m);
    }

    return "Use numerical integration for definite bounds.";
  }

  /**
   * Compute sigma summation: Σ_{i=start}^{end} f(i)
   * @param {string} expr - expression in terms of 'i' or 'n'
   * @param {number} start
   * @param {number} end
   * @returns {{ result: number, steps: Array, error: string|null }}
   */
  function sigma(expr, start, end) {
    try {
      const cleanExpr = preprocessExpression(expr).replace(/\bn\b/g, "i");
      let sum = 0;
      const steps = [];

      for (let i = start; i <= end; i++) {
        const val = _math.evaluate(cleanExpr, { i });
        if (!isFinite(val)) throw new Error(`f(${i}) is not finite`);
        sum += val;
        steps.push({ i, value: val, cumulative: sum });
      }

      return { result: sum, steps, error: null };
    } catch (e) {
      return { result: NaN, steps: [], error: e.message };
    }
  }

  /**
   * Validate whether an expression is syntactically valid
   * @param {string} expr
   * @param {string} variable - 'x' or 'i'
   * @returns {{ valid: boolean, error: string|null }}
   */
  function validate(expr, variable = "x") {
    try {
      const clean = preprocessExpression(expr);
      _math.evaluate(clean, { [variable]: 1 });
      return { valid: true, error: null };
    } catch (e) {
      return { valid: false, error: e.message };
    }
  }

  /**
   * Format a number for display (smart rounding)
   * @param {number} n
   * @param {number} decimals
   * @returns {string}
   */
  function formatNumber(n, decimals = 6) {
    if (!isFinite(n)) return "undefined";
    if (Number.isInteger(n)) return n.toFixed(0);
    return parseFloat(n.toFixed(decimals)).toString();
  }

  return {
    evaluate,
    evaluateRange,
    derivative,
    numericalDerivative,
    tangentLine,
    definiteIntegral,
    integralFillData,
    indefiniteIntegral,
    sigma,
    validate,
    formatNumber,
    preprocessExpression,
  };
})();

window.MathEngine = MathEngine;
