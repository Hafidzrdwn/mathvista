const Statistics = (() => {
  function parseDataset(input) {
    const nums = input
      .split(/[,\s\n]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .map(Number);

    if (nums.some(n => isNaN(n))) {
      throw new Error('Dataset contains non-numeric values.');
    }
    if (nums.length === 0) throw new Error('No data entered.');
    return nums;
  }

  function mean(data) {
    return data.reduce((a, b) => a + b, 0) / data.length;
  }

  function median(data) {
    const sorted = [...data].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0
      ? sorted[mid]
      : (sorted[mid - 1] + sorted[mid]) / 2;
  }

  function mode(data) {
    const freq = {};
    data.forEach(v => { freq[v] = (freq[v] || 0) + 1; });
    const maxFreq = Math.max(...Object.values(freq));
    if (maxFreq === 1) return { values: [], label: 'No mode (all unique)' };
    const modes = Object.keys(freq)
      .filter(k => freq[k] === maxFreq)
      .map(Number);
    return { values: modes, frequency: maxFreq, label: modes.join(', ') };
  }

  function range(data) {
    return Math.max(...data) - Math.min(...data);
  }

  function variance(data, population = false) {
    const m = mean(data);
    const squaredDiffs = data.map(v => (v - m) ** 2);
    const divisor = population ? data.length : data.length - 1;
    return squaredDiffs.reduce((a, b) => a + b, 0) / divisor;
  }

  function stdDev(data, population = false) {
    return Math.sqrt(variance(data, population));
  }

  function percentile(data, p) {
    const sorted = [...data].sort((a, b) => a - b);
    const idx = (p / 100) * (sorted.length - 1);
    const lower = Math.floor(idx);
    const upper = Math.ceil(idx);
    if (lower === upper) return sorted[lower];
    return sorted[lower] + (sorted[upper] - sorted[lower]) * (idx - lower);
  }

  function quartiles(data) {
    return {
      q1: percentile(data, 25),
      q2: percentile(data, 50),
      q3: percentile(data, 75),
      iqr: percentile(data, 75) - percentile(data, 25),
    };
  }

  function skewness(data) {
    const m = mean(data);
    const sd = stdDev(data);
    if (sd === 0) return 0;
    const n = data.length;
    const sum = data.reduce((acc, v) => acc + ((v - m) / sd) ** 3, 0);
    return (n / ((n - 1) * (n - 2))) * sum;
  }

  function kurtosis(data) {
    const m = mean(data);
    const sd = stdDev(data);
    if (sd === 0) return 0;
    const n = data.length;
    const sum = data.reduce((acc, v) => acc + ((v - m) / sd) ** 4, 0);
    return ((n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3))) * sum
           - (3 * (n - 1) ** 2) / ((n - 2) * (n - 3));
  }

  /**
   * Compute all descriptive statistics at once
   * @param {number[]} data
   * @returns {object}
   */
  function describe(data) {
    if (!data || data.length === 0) throw new Error('Empty dataset');

    const m    = mean(data);
    const sd   = stdDev(data);
    const mdn  = median(data);
    const md   = mode(data);
    const v    = variance(data);
    const r    = range(data);
    const q    = quartiles(data);
    const skew = skewness(data);
    const kurt = kurtosis(data);
    const sorted = [...data].sort((a, b) => a - b);

    return {
      count: data.length,
      sum: data.reduce((a, b) => a + b, 0),
      mean: m,
      median: mdn,
      mode: md,
      range: r,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      variance: v,
      stdDev: sd,
      coefficientOfVariation: (sd / m) * 100,
      quartiles: q,
      skewness: skew,
      kurtosis: kurt,
      sorted,
    };
  }

  /**
   * Detect whether input data is numeric (continuous/discrete) or categorical (nominal/ordinal)
   * @param {string} rawInput - raw user input string
   * @returns {object}
   */
  function detectDataType(rawInput) {
    const tokens = rawInput
      .split(/[,\n]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);

    if (tokens.length === 0) return { type: 'unknown', subtype: 'unknown' };

    const numericTokens = tokens.filter(t => !isNaN(Number(t)) && t !== '');
    const isAllNumeric = numericTokens.length === tokens.length;

    if (isAllNumeric) {
      const nums = tokens.map(Number);
      const allIntegers = nums.every(n => Number.isInteger(n));

      const isDiscrete = allIntegers && (Math.max(...nums) - Math.min(...nums)) < nums.length * 10;

      return {
        type: 'numeric',
        subtype: isDiscrete ? 'discrete' : 'continuous',
        values: nums,
        explanation: isDiscrete
          ? 'All values are integers with limited range. This appears to be discrete numeric data (countable, like test scores or number of students).'
          : 'Values include decimal numbers or have a wide continuous range. This appears to be continuous numeric data (measurable, like height or temperature).',
      };
    }

    const ordinalKeywords = ['low', 'medium', 'high', 'very', 'poor', 'good', 'excellent',
                              '1st', '2nd', '3rd', 'first', 'second', 'third',
                              'strongly agree', 'agree', 'neutral', 'disagree'];

    const lowerTokens = tokens.map(t => t.toLowerCase());
    const isOrdinal = ordinalKeywords.some(kw => lowerTokens.some(t => t.includes(kw)));

    return {
      type: 'categorical',
      subtype: isOrdinal ? 'ordinal' : 'nominal',
      values: tokens,
      uniqueValues: [...new Set(tokens)],
      explanation: isOrdinal
        ? 'Data contains ordered categories (e.g., Low < Medium < High). This is ordinal data — categories with a meaningful order but no fixed difference between them.'
        : 'Data contains unordered categories without inherent ranking. This is nominal data — labels or names with no natural order (e.g., colors, countries, names).',
    };
  }

  function frequencyTable(data) {
    const freq = {};
    data.forEach(v => { freq[v] = (freq[v] || 0) + 1; });
    const total = data.length;
    return Object.entries(freq)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([value, count]) => ({
        value: Number(value),
        count,
        relativeFreq: (count / total * 100).toFixed(2) + '%',
      }));
  }

  function zScores(data) {
    const m = mean(data);
    const sd = stdDev(data);
    return data.map(v => ({ value: v, z: sd !== 0 ? (v - m) / sd : 0 }));
  }

  function fmt(n, d = 4) {
    if (!isFinite(n)) return 'N/A';
    return parseFloat(n.toFixed(d)).toString();
  }

  return {
    parseDataset,
    mean,
    median,
    mode,
    range,
    variance,
    stdDev,
    percentile,
    quartiles,
    skewness,
    kurtosis,
    describe,
    detectDataType,
    frequencyTable,
    zScores,
    fmt,
  };

})();

window.Statistics = Statistics;
