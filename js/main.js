function floatToHex(floatValue, subStart, subEnd) {
    // Convert float to IEEE 754 representation
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setFloat32(0, floatValue, false);

    const hex = view.getUint32(0).toString(16).toUpperCase();

    if (hex == '0') {
        return '00000000'.substring(subStart, subEnd);
    }

    return hex.substring(subStart, subEnd);
}

function getValueFromPercentage(range, percent, isInverse = false, percentMax = 100) {
    const { min, max } = range;
    const defaultVal = parseFloat(range.value);
    const clampedPercent = Math.min(Math.max(percent, 0), percentMax);
    const halfMax = 100;

    if (!isInverse) {
        if (clampedPercent <= halfMax) {
            const ratio = clampedPercent / halfMax;
            const value = min + (defaultVal - min) * ratio;
            return parseFloat(value.toFixed(8));
        } else {
            const ratio = (clampedPercent - halfMax) / halfMax;
            const value = defaultVal + (max - defaultVal) * ratio;
            return parseFloat(value.toFixed(8));
        }
    } else {
        if (clampedPercent <= halfMax) {
            const ratio = clampedPercent / halfMax;
            const value = max - (max - defaultVal) * ratio;
            return parseFloat(value.toFixed(8));
        } else {
            const ratio = (clampedPercent - halfMax) / halfMax;
            const value = defaultVal - (defaultVal - min) * ratio;
            return parseFloat(value.toFixed(8));
        }
    }
}

function getPercentageFromValue(range, value, isInverse = false, percentMax = 100) {
    const { min, max } = range;
    const defaultVal = parseFloat(range.value);
    const clampedValue = Math.min(Math.max(value, min), max);
    const halfMax = 100;

    if (!isInverse) {
        if (clampedValue <= defaultVal) {
            const denom = (defaultVal - min);
            const pct = denom === 0 ? 0 : ((clampedValue - min) / denom) * halfMax;
            return parseFloat(pct.toFixed(8));
        } else {
            const denom = (max - defaultVal);
            const pct = denom === 0 ? halfMax : halfMax + ((clampedValue - defaultVal) / denom) * halfMax;
            return parseFloat(pct.toFixed(8));
        }
    } else {
        if (clampedValue >= defaultVal) {
            const denom = (max - defaultVal);
            const pct = denom === 0 ? 0 : ((max - clampedValue) / denom) * halfMax;
            return parseFloat(pct.toFixed(8));
        } else {
            const denom = (defaultVal - min);
            const pct = denom === 0 ? halfMax : halfMax + ((defaultVal - clampedValue) / denom) * halfMax;
            return parseFloat(pct.toFixed(8));
        }
    }
}

function applyGameConfig(gameKey) {
    if (!gameConfigs) return;
    const cfg = gameConfigs[gameKey];
    if (!cfg) {
        console.warn(`No config found for game key: ${gameKey}`);
        return;
    }
    const r = cfg.ranges;
    // smoothing
    const PCT_MAX = 200;
    smoothingRange.min = 0;
    smoothingRange.max = PCT_MAX;
    smoothingRange.step = Math.max(0.01, (r.smoothing.step / (r.smoothing.max - r.smoothing.min)) * PCT_MAX);
    smoothingRange.value = getPercentageFromValue(r.smoothing, parseFloat(r.smoothing.value), r.smoothing.isInverse || false, PCT_MAX);
    smoothingNumber.min = r.smoothing.min;
    smoothingNumber.max = r.smoothing.max;
    smoothingNumber.step = r.smoothing.step;
    smoothingNumber.value = parseFloat(r.smoothing.value);
    const smoothingPctEl = document.getElementById('smoothingPercent');
    if (smoothingPctEl) smoothingPctEl.textContent = `${parseFloat(smoothingRange.value).toFixed(0)}%`;

    // steering deadzone
    deadzoneLowRange.min = r.deadzone_low.min;
    deadzoneLowRange.max = r.deadzone_low.max;
    deadzoneLowRange.step = r.deadzone_low.step;
    deadzoneLowRange.value = r.deadzone_low.value;
    deadzoneLowNumber.min = r.deadzone_low.min;
    deadzoneLowNumber.max = r.deadzone_low.max;
    deadzoneLowNumber.step = r.deadzone_low.step;
    deadzoneLowNumber.value = r.deadzone_low.value;

    deadzoneHighRange.min = r.deadzone_high.min;
    deadzoneHighRange.max = r.deadzone_high.max;
    deadzoneHighRange.step = r.deadzone_high.step;
    deadzoneHighRange.value = r.deadzone_high.value;
    deadzoneHighNumber.min = r.deadzone_high.min;
    deadzoneHighNumber.max = r.deadzone_high.max;
    deadzoneHighNumber.step = r.deadzone_high.step;
    deadzoneHighNumber.value = r.deadzone_high.value;

    deadzoneMidRange.min = r.midpoint.min;
    deadzoneMidRange.max = r.midpoint.max;
    deadzoneMidRange.step = r.midpoint.step;
    deadzoneMidRange.value = r.midpoint.value;
    deadzoneMidNumber.min = r.midpoint.min;
    deadzoneMidNumber.max = r.midpoint.max;
    deadzoneMidNumber.step = r.midpoint.step;
    deadzoneMidNumber.value = r.midpoint.value;

    // throttle deadzone
    throttleLowRange.min = r.deadzone_low.min;
    throttleLowRange.max = r.deadzone_low.max;
    throttleLowRange.step = r.deadzone_low.step;
    throttleLowRange.value = r.deadzone_low.value;
    throttleLowNumber.min = r.deadzone_low.min;
    throttleLowNumber.max = r.deadzone_low.max;
    throttleLowNumber.step = r.deadzone_low.step;
    throttleLowNumber.value = r.deadzone_low.value;

    throttleMidRange.min = r.midpoint.min;
    throttleMidRange.max = r.midpoint.max;
    throttleMidRange.step = r.midpoint.step;
    throttleMidRange.value = r.midpoint.value;
    throttleMidNumber.min = r.deadzone_low.min;
    throttleMidNumber.max = r.deadzone_low.max;
    throttleMidNumber.step = r.deadzone_low.step;
    throttleMidNumber.value = r.midpoint.value;

    throttleHighRange.min = r.deadzone_high.min;
    throttleHighRange.max = r.deadzone_high.max;
    throttleHighRange.step = r.deadzone_high.step;
    throttleHighRange.value = r.deadzone_high.value;
    throttleHighNumber.min = r.deadzone_high.min;
    throttleHighNumber.max = r.deadzone_high.max;
    throttleHighNumber.step = r.deadzone_high.step;
    throttleHighNumber.value = r.deadzone_high.value;

    // brake deadzone
    brakeLowRange.min = r.deadzone_low.min;
    brakeLowRange.max = r.deadzone_low.max;
    brakeLowRange.step = r.deadzone_low.step;
    brakeLowRange.value = r.deadzone_low.value;
    brakeLowNumber.min = r.deadzone_low.min;
    brakeLowNumber.max = r.deadzone_low.max;
    brakeLowNumber.step = r.deadzone_low.step;
    brakeLowNumber.value = r.deadzone_low.value;

    brakeMidRange.min = r.midpoint.min;
    brakeMidRange.max = r.midpoint.max;
    brakeMidRange.step = r.midpoint.step;
    brakeMidRange.value = r.midpoint.value;
    brakeMidNumber.min = r.midpoint.min;
    brakeMidNumber.max = r.midpoint.max;
    brakeMidNumber.step = r.midpoint.step;
    brakeMidNumber.value = r.midpoint.value;

    brakeHighRange.min = r.deadzone_high.min;
    brakeHighRange.max = r.deadzone_high.max;
    brakeHighRange.step = r.deadzone_high.step;
    brakeHighRange.value = r.deadzone_high.value;
    brakeHighNumber.min = r.deadzone_high.min;
    brakeHighNumber.max = r.deadzone_high.max;
    brakeHighNumber.step = r.deadzone_high.step;
    brakeHighNumber.value = r.deadzone_high.value;

    // reduction
    reductionRange.min = 0;
    reductionRange.max = PCT_MAX;
    reductionRange.step = Math.max(0.01, (r.reduction.step / (r.reduction.max - r.reduction.min)) * PCT_MAX);
    reductionRange.value = getPercentageFromValue(r.reduction, parseFloat(r.reduction.value), r.reduction.isInverse || false, PCT_MAX);
    reductionNumber.min = r.reduction.min;
    reductionNumber.max = r.reduction.max;
    reductionNumber.step = r.reduction.step;
    reductionNumber.value = parseFloat(r.reduction.value);
    const reductionPctEl = document.getElementById('reductionPercent');
    if (reductionPctEl) reductionPctEl.textContent = `${parseFloat(reductionRange.value).toFixed(0)}%`;

    // reset disables and apply their change handler
    smoothingDisable.checked = false;
    deadzoneLowDisable.checked = false;
    deadzoneHighDisable.checked = false;
    throttleLowDisable.checked = false;
    throttleHighDisable.checked = false;
    brakeLowDisable.checked = false;
    brakeHighDisable.checked = false;
    reductionDisable.checked = false;

    [
        smoothingDisable, deadzoneLowDisable, deadzoneHighDisable,
        throttleLowDisable, throttleHighDisable,
        brakeLowDisable, brakeHighDisable,
        reductionDisable
    ].forEach(cb => cb.dispatchEvent(new Event('change')));
}

function generatePnachPreview(gameKey, values) {
    if (!gameConfigs) return '';
    const cfg = gameConfigs[gameKey];
    if (!cfg) return '';
    const tpl = cfg.pnachTemplate;
    const subs = {
        '{{SMOOTHING}}': values.smoothingDisabled ? 'DISABLED' : floatToHex(parseFloat(values.smoothing), 0, 8),
        '{{SMOOTHING_LO}}': values.smoothingDisabled ? 'DISABLED' : floatToHex(parseFloat(values.smoothing), 0, 4),
        '{{SMOOTHING_HI}}': values.smoothingDisabled ? 'DISABLED' : floatToHex(parseFloat(values.smoothing), 4, 8),

        // steering deadzone
        '{{DEADZONE_LOW}}': values.deadzoneLowDisabled ? 'DISABLED' : floatToHex(parseFloat(values.deadzoneLow), 0, 8),
        '{{DEADZONE_LOW_LO}}': values.deadzoneLowDisabled ? 'DISABLED' : floatToHex(parseFloat(values.deadzoneLow), 0, 4),
        '{{DEADZONE_LOW_HI}}': values.deadzoneLowDisabled ? 'DISABLED' : floatToHex(parseFloat(values.deadzoneLow), 4, 8),

        '{{DEADZONE_HIGH}}': values.deadzoneHighDisabled ? 'DISABLED' : floatToHex(parseFloat(values.deadzoneHigh), 0, 8),
        '{{DEADZONE_HIGH_LO}}': values.deadzoneHighDisabled ? 'DISABLED' : floatToHex(parseFloat(values.deadzoneHigh), 0, 4),
        '{{DEADZONE_HIGH_HI}}': values.deadzoneHighDisabled ? 'DISABLED' : floatToHex(parseFloat(values.deadzoneHigh), 4, 8),

        '{{DEADZONE_MID}}': values.deadzoneMidDisabled ? 'DISABLED' : floatToHex(parseFloat(values.deadzoneMid), 0, 8) || '00000000',
        '{{DEADZONE_MID_LO}}': values.deadzoneMidDisabled ? 'DISABLED' : floatToHex(parseFloat(values.deadzoneMid), 0, 4) || '0000',
        '{{DEADZONE_MID_HI}}': values.deadzoneMidDisabled ? 'DISABLED' : floatToHex(parseFloat(values.deadzoneMid), 4, 8) || '0000',

        '{{DEADZONE_MID_M_LOW_LO}}': values.deadzoneMidDisabled || values.deadzoneLowDisabled ? 'DISABLED' : floatToHex(parseFloat(values.deadzoneMid) - parseFloat(values.deadzoneLow), 0, 4),
        '{{DEADZONE_MID_M_LOW_HI}}': values.deadzoneMidDisabled || values.deadzoneLowDisabled ? 'DISABLED' : floatToHex(parseFloat(values.deadzoneMid) - parseFloat(values.deadzoneLow), 4, 8),
        '{{DEADZONE_HIGH_M_MID_LO}}': values.deadzoneHighDisabled || values.deadzoneMidDisabled ? 'DISABLED' : floatToHex(parseFloat(values.deadzoneHigh) - parseFloat(values.deadzoneMid), 0, 4),
        '{{DEADZONE_HIGH_M_MID_HI}}': values.deadzoneHighDisabled || values.deadzoneMidDisabled ? 'DISABLED' : floatToHex(parseFloat(values.deadzoneHigh) - parseFloat(values.deadzoneMid), 4, 8),

        // reduction
        '{{REDUCTION}}': values.reductionDisabled ? 'DISABLED' : floatToHex(parseFloat(values.reduction), 0, 8),
        '{{REDUCTION_LO}}': values.reductionDisabled ? 'DISABLED' : floatToHex(parseFloat(values.reduction), 0, 4),
        '{{REDUCTION_HI}}': values.reductionDisabled ? 'DISABLED' : floatToHex(parseFloat(values.reduction), 4, 8),

        // throttle
        '{{THROTTLE_LOW}}': values.throttleLowDisabled ? 'DISABLED' : floatToHex(parseFloat(values.throttleLow), 0, 8),
        '{{THROTTLE_LOW_LO}}': values.throttleLowDisabled ? 'DISABLED' : floatToHex(parseFloat(values.throttleLow), 0, 4),
        '{{THROTTLE_LOW_HI}}': values.throttleLowDisabled ? 'DISABLED' : floatToHex(parseFloat(values.throttleLow), 4, 8),

        '{{THROTTLE_MID}}': values.throttleMidDisabled ? 'DISABLED' : floatToHex(parseFloat(values.throttleMid), 0, 8) || '00000000',
        '{{THROTTLE_MID_LO}}': values.throttleMidDisabled ? 'DISABLED' : floatToHex(parseFloat(values.throttleMid), 0, 4) || '0000',
        '{{THROTTLE_MID_HI}}': values.throttleMidDisabled ? 'DISABLED' : floatToHex(parseFloat(values.throttleMid), 4, 8) || '0000',

        '{{THROTTLE_HIGH}}': values.throttleHighDisabled ? 'DISABLED' : floatToHex(parseFloat(values.throttleHigh), 0, 8),
        '{{THROTTLE_HIGH_LO}}': values.throttleHighDisabled ? 'DISABLED' : floatToHex(parseFloat(values.throttleHigh), 0, 4),
        '{{THROTTLE_HIGH_HI}}': values.throttleHighDisabled ? 'DISABLED' : floatToHex(parseFloat(values.throttleHigh), 4, 8),

        '{{THROTTLE_MID_M_LOW_LO}}': values.throttleMidDisabled || values.throttleLowDisabled ? 'DISABLED' : floatToHex(parseFloat(values.throttleMid) - parseFloat(values.throttleLow), 0, 4),
        '{{THROTTLE_MID_M_LOW_HI}}': values.throttleMidDisabled || values.throttleLowDisabled ? 'DISABLED' : floatToHex(parseFloat(values.throttleMid) - parseFloat(values.throttleLow), 4, 8),

        // brake
        '{{BRAKE_LOW}}': values.brakeLowDisabled ? 'DISABLED' : floatToHex(parseFloat(values.brakeLow), 0, 8),
        '{{BRAKE_LOW_LO}}': values.brakeLowDisabled ? 'DISABLED' : floatToHex(parseFloat(values.brakeLow), 0, 4),
        '{{BRAKE_LOW_HI}}': values.brakeLowDisabled ? 'DISABLED' : floatToHex(parseFloat(values.brakeLow), 4, 8),

        '{{BRAKE_MID}}': values.brakeMidDisabled ? 'DISABLED' : floatToHex(parseFloat(values.brakeMid), 0, 8) || '00000000',
        '{{BRAKE_MID_LO}}': values.brakeMidDisabled ? 'DISABLED' : floatToHex(parseFloat(values.brakeMid), 0, 4) || '0000',
        '{{BRAKE_MID_HI}}': values.brakeMidDisabled ? 'DISABLED' : floatToHex(parseFloat(values.brakeMid), 4, 8) || '0000',

        '{{BRAKE_HIGH}}': values.brakeHighDisabled ? 'DISABLED' : floatToHex(parseFloat(values.brakeHigh), 0, 8),
        '{{BRAKE_HIGH_LO}}': values.brakeHighDisabled ? 'DISABLED' : floatToHex(parseFloat(values.brakeHigh), 0, 4),
        '{{BRAKE_HIGH_HI}}': values.brakeHighDisabled ? 'DISABLED' : floatToHex(parseFloat(values.brakeHigh), 4, 8),

        '{{BRAKE_MID_M_LOW_LO}}': values.brakeMidDisabled || values.brakeLowDisabled ? 'DISABLED' : floatToHex(parseFloat(values.brakeMid) - parseFloat(values.brakeLow), 0, 4),
        '{{BRAKE_MID_M_LOW_HI}}': values.brakeMidDisabled || values.brakeLowDisabled ? 'DISABLED' : floatToHex(parseFloat(values.brakeMid) - parseFloat(values.brakeLow), 4, 8)
    };
    let out = tpl;
    for (const key in subs) out = out.replace(new RegExp(key, 'g'), subs[key]);
    return out;
}

function updatePreview() {
    const payload = {
        smoothing: smoothingNumber.value,
        smoothingDisabled: smoothingDisable.checked,
        deadzoneLow: deadzoneLowNumber.value,
        deadzoneLowDisabled: deadzoneLowDisable.checked,
        deadzoneMid: deadzoneMidNumber.value,
        deadzoneMidDisabled: false,
        deadzoneHigh: deadzoneHighNumber.value,
        deadzoneHighDisabled: deadzoneHighDisable.checked,

        throttleLow: throttleLowNumber.value,
        throttleLowDisabled: throttleLowDisable.checked,
        throttleMid: throttleMidNumber.value,
        throttleMidDisabled: false,
        throttleHigh: throttleHighNumber.value,
        throttleHighDisabled: throttleHighDisable.checked,

        brakeLow: brakeLowNumber.value,
        brakeLowDisabled: brakeLowDisable.checked,
        brakeMid: brakeMidNumber.value,
        brakeMidDisabled: false,
        brakeHigh: brakeHighNumber.value,
        brakeHighDisabled: brakeHighDisable.checked,

        reduction: reductionNumber.value,
        reductionDisabled: reductionDisable.checked
    };
    const preview = generatePnachPreview(gameSelect.value, payload);
    if (pnachOutput) pnachOutput.value = preview;

    if (updateDeadzoneChart) updateDeadzoneChart(payload);
}

function mapInput(x, LOW, MID, HIGH) {
    if (x < LOW) return 0;
    if (x < MID) {
        return ((x - LOW) / (MID - LOW)) * 0.5;
    }
    if (x < HIGH) {
        return ((x - MID) / (HIGH - MID)) * 0.5 + 0.5;
    }
    return 1;
}
function generateDataFor(LOW, MID, HIGH) {
    let ys = [];
    for (let i = 0; i <= 100; i++) {
        const x = i / 100;
        ys.push(mapInput(x, LOW, MID, HIGH));
    }
    return ys;
}

function makeMiniChart(canvasEl, color) {
    if (!canvasEl) return null;
    const ctx = canvasEl.getContext('2d');
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 101 }, (_, i) => parseFloat((i / 100).toFixed(2))),
            datasets: [{ data: [], borderColor: color, borderWidth: 2, pointRadius: 0 }]
        },
        options: {
            animation: false,
            aspectRatio: 1,
            scales: {
                x: {
                    display: true,
                    min: 0,
                    max: 1,
                    grid: { color: '#adb5bd50' },
                    ticks: {
                        callback: function (value) { return parseFloat(value / 100).toString(); }
                    }
                },
                y: {
                    display: true,
                    min: 0,
                    max: 1,
                    grid: { color: '#adb5bd50' },
                    ticks: {
                        callback: function (value) { return parseFloat(value).toString(); }
                    }
                }
            },
            plugins: { legend: { display: false }, tooltip: { enabled: false } }
        }
    });
}

function initDeadzoneCharts() {
    const steerCanvas = document.getElementById('deadzoneChartSteer');
    const throttleCanvas = document.getElementById('deadzoneChartThrottle');
    const brakeCanvas = document.getElementById('deadzoneChartBrake');

    deadzoneCharts.steer = makeMiniChart(steerCanvas, '#4e79a7');
    deadzoneCharts.throttle = makeMiniChart(throttleCanvas, '#59a14f');
    deadzoneCharts.brake = makeMiniChart(brakeCanvas, '#e15759');
}

function updateDeadzoneChart(values) {
    if (!deadzoneCharts) return;

    const sLow = parseFloat(values.deadzoneLowDisabled ? 1.0 : values.deadzoneLow || 0);
    const sMid = parseFloat(values.deadzoneMidDisabled ? 1.0 : values.deadzoneMid || 0.5);
    const sHigh = parseFloat(values.deadzoneHighDisabled ? 1.0 : values.deadzoneHigh || 1);
    const tLow = parseFloat(values.throttleLowDisabled ? 1.0 : values.throttleLow || 0);
    const tMid = parseFloat(values.throttleMidDisabled ? 1.0 : values.throttleMid || 0.5);
    const tHigh = parseFloat(values.throttleHighDisabled ? 1.0 : values.throttleHigh || 1);
    const bLow = parseFloat(values.brakeLowDisabled ? 1.0 : values.brakeLow || 0);
    const bMid = parseFloat(values.brakeMidDisabled ? 1.0 : values.brakeMid || 0.5);
    const bHigh = parseFloat(values.brakeHighDisabled ? 1.0 : values.brakeHigh || 1);

    if (deadzoneCharts.steer) {
        deadzoneCharts.steer.data.datasets[0].data = generateDataFor(sLow, sMid, sHigh);
        deadzoneCharts.steer.update('none');
    }
    if (deadzoneCharts.throttle) {
        deadzoneCharts.throttle.data.datasets[0].data = generateDataFor(tLow, tMid, tHigh);
        deadzoneCharts.throttle.update('none');
    }
    if (deadzoneCharts.brake) {
        deadzoneCharts.brake.data.datasets[0].data = generateDataFor(bLow, bMid, bHigh);
        deadzoneCharts.brake.update('none');
    }
}

const syncPair = (rangeEl, numEl, disableEl = null) => {
    rangeEl.addEventListener('input', () => { if (!disableEl || !disableEl.checked) numEl.value = rangeEl.value; });
    numEl.addEventListener('input', () => { if (!disableEl || !disableEl.checked) rangeEl.value = numEl.value; });
    if (disableEl) {
        disableEl.addEventListener('change', () => {
            const disabled = disableEl.checked;
            rangeEl.disabled = disabled;
            numEl.disabled = disabled;
        });
    }
};

function syncPercentPair(percentRangeEl, percentLabelEl, numEl, disableEl = null, getCfgRange = () => null) {
    const updateLabel = (v) => { if (percentLabelEl) percentLabelEl.textContent = `${parseFloat(v).toFixed(0)}%`; };

    percentRangeEl.addEventListener('input', () => {
        const cfg = getCfgRange();
        if (!cfg) return;
        const percentMax = parseFloat(percentRangeEl.max) || 100;
        const raw = getValueFromPercentage(cfg, parseFloat(percentRangeEl.value), cfg.isInverse || false, percentMax);
        if (!disableEl || !disableEl.checked) numEl.value = raw;
        updateLabel(percentRangeEl.value);
        updatePreview();
    });

    numEl.addEventListener('input', () => {
        const cfg = getCfgRange();
        if (!cfg) return;
        const percentMax = parseFloat(percentRangeEl.max) || 100;
        const pct = getPercentageFromValue(cfg, parseFloat(numEl.value || cfg.min), cfg.isInverse || false, percentMax);
        if (!disableEl || !disableEl.checked) percentRangeEl.value = pct;
        updateLabel(percentRangeEl.value);
        updatePreview();
    });

    if (disableEl) {
        disableEl.addEventListener('change', () => {
            const disabled = disableEl.checked;
            percentRangeEl.disabled = disabled;
            numEl.disabled = disabled;
        });
    }
}

const smoothingRange = document.getElementById('smoothingRange');
const smoothingNumber = document.getElementById('smoothingNumber');
const smoothingDisable = document.getElementById('smoothingDisable');

const deadzoneLowRange = document.getElementById('deadzoneLowRange');
const deadzoneLowNumber = document.getElementById('deadzoneLowNumber');
const deadzoneLowDisable = document.getElementById('deadzoneLowDisable');

const deadzoneHighRange = document.getElementById('deadzoneHighRange');
const deadzoneHighNumber = document.getElementById('deadzoneHighNumber');
const deadzoneHighDisable = document.getElementById('deadzoneHighDisable');

// steering MID
const deadzoneMidRange = document.getElementById('deadzoneMidRange');
const deadzoneMidNumber = document.getElementById('deadzoneMidNumber');

// throttle elements
const throttleLowRange = document.getElementById('throttleLowRange');
const throttleLowNumber = document.getElementById('throttleLowNumber');
const throttleLowDisable = document.getElementById('throttleLowDisable');

const throttleMidRange = document.getElementById('throttleMidRange');
const throttleMidNumber = document.getElementById('throttleMidNumber');

const throttleHighRange = document.getElementById('throttleHighRange');
const throttleHighNumber = document.getElementById('throttleHighNumber');
const throttleHighDisable = document.getElementById('throttleHighDisable');

// brake elements
const brakeLowRange = document.getElementById('brakeLowRange');
const brakeLowNumber = document.getElementById('brakeLowNumber');
const brakeLowDisable = document.getElementById('brakeLowDisable');

const brakeMidRange = document.getElementById('brakeMidRange');
const brakeMidNumber = document.getElementById('brakeMidNumber');

const brakeHighRange = document.getElementById('brakeHighRange');
const brakeHighNumber = document.getElementById('brakeHighNumber');
const brakeHighDisable = document.getElementById('brakeHighDisable');

const reductionRange = document.getElementById('reductionRange');
const reductionNumber = document.getElementById('reductionNumber');
const reductionDisable = document.getElementById('reductionDisable');

const gameSelect = document.getElementById('gameSelect');
const downloadBtn = document.getElementById('downloadBtn');
const pnachOutput = document.getElementById('pnachOutput');
const resetBtn = document.getElementById('resetBtn');

let deadzoneCharts = { steer: null, throttle: null, brake: null };

// steering smoothing
syncPercentPair(
    smoothingRange,
    document.getElementById('smoothingPercent'),
    smoothingNumber,
    smoothingDisable,
    () => gameConfigs[gameSelect.value]?.ranges.smoothing
);

// steering deadzone
syncPair(deadzoneLowRange, deadzoneLowNumber, deadzoneLowDisable);
syncPair(deadzoneMidRange, deadzoneMidNumber);
syncPair(deadzoneHighRange, deadzoneHighNumber, deadzoneHighDisable);

// throttle deadzone
syncPair(throttleLowRange, throttleLowNumber, throttleLowDisable);
syncPair(throttleMidRange, throttleMidNumber);
syncPair(throttleHighRange, throttleHighNumber, throttleHighDisable);

// brake deadzone
syncPair(brakeLowRange, brakeLowNumber, brakeLowDisable);
syncPair(brakeMidRange, brakeMidNumber);
syncPair(brakeHighRange, brakeHighNumber, brakeHighDisable);

// steering reduction
syncPercentPair(
    reductionRange,
    document.getElementById('reductionPercent'),
    reductionNumber,
    reductionDisable,
    () => gameConfigs[gameSelect.value]?.ranges.reduction
);

// wire inputs to live update
[
    smoothingRange, smoothingNumber, smoothingDisable,
    deadzoneLowRange, deadzoneLowNumber, deadzoneLowDisable,
    deadzoneMidRange, deadzoneMidNumber,
    deadzoneHighRange, deadzoneHighNumber, deadzoneHighDisable,
    throttleLowRange, throttleLowNumber, throttleLowDisable,
    throttleMidRange, throttleMidNumber,
    throttleHighRange, throttleHighNumber, throttleHighDisable,
    brakeLowRange, brakeLowNumber, brakeLowDisable,
    brakeMidRange, brakeMidNumber,
    brakeHighRange, brakeHighNumber, brakeHighDisable,
    reductionRange, reductionNumber, reductionDisable
].forEach(el => {
    if (!el) return;
    const ev = (el.type === 'checkbox' || el.tagName === 'SELECT') ? 'change' : 'input';
    el.addEventListener(ev, updatePreview);
});

// game change update
gameSelect.addEventListener('change', () => {
    applyGameConfig(gameSelect.value);
    updatePreview();
});

// reset button
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        applyGameConfig(gameSelect.value);
        updatePreview();
    });
}

// download handler
if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        const content = pnachOutput ? pnachOutput.value : '';
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const label = (gameConfigs[gameSelect.value]?.label || gameSelect.value).replace(/[^\w\- ]+/g, '');
        const filename = gameConfigs[gameSelect.value]?.filename || `${label.replace(/\s+/g, '_')}.pnach`;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}

// initial game config
[smoothingDisable, deadzoneLowDisable, deadzoneHighDisable,
    throttleLowDisable, throttleHighDisable, brakeLowDisable, brakeHighDisable,
    reductionDisable].forEach(cb => cb.dispatchEvent(new Event('change')));
applyGameConfig(gameSelect.value);


// init charts
initDeadzoneCharts();
updatePreview();

