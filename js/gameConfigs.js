// game config map
const gameConfigs = {
    //// Kaido Battle 1
    kb1: {
        label: 'Kaido Battle 1',
        filename: 'SLPM-65246_2046216F.pnach',
        ranges: {
            smoothing: { min: 0, max: 2, step: 0.01, value: '0.50' },
            deadzone_low: { min: 0, max: 1, step: 0.01, value: '0.05' },
            midpoint: { min: 0, max: 1, step: 0.01, value: '0.50' },
            deadzone_high: { min: 0, max: 1, step: 0.01, value: '0.95' },
            reduction: { min: 0, max: 20, step: 0.1, value: '1.80' }
        },
        pnachTemplate: ``
    },
    kb1kor: {
        label: 'Kaido Battle 1 (KOR)',
        filename: 'SLKA-25063_E3795E39.pnach',
        ranges: {
            smoothing: { min: 0, max: 2, step: 0.01, value: '0.50' },
            deadzone_low: { min: 0, max: 1, step: 0.01, value: '0.05' },
            midpoint: { min: 0, max: 1, step: 0.01, value: '0.50' },
            deadzone_high: { min: 0, max: 1, step: 0.01, value: '0.95' },
            reduction: { min: 0, max: 20, step: 0.1, value: '1.80' }
        },
        pnachTemplate: ``
    },
    txrd1: {
        label: 'Tokyo Xtreme Racer: Drift',
        filename: 'SLUS-21236_07A4E535.pnach',
        ranges: {
            smoothing: { min: 0, max: 2, step: 0.01, value: '0.50' },
            deadzone_low: { min: 0, max: 1, step: 0.01, value: '0.05' },
            midpoint: { min: 0, max: 1, step: 0.01, value: '0.50' },
            deadzone_high: { min: 0, max: 1, step: 0.01, value: '0.95' },
            reduction: { min: 0, max: 20, step: 0.1, value: '1.80' }
        },
        pnachTemplate: ``
    },
    ///// Kaido Battle 2

    ///// Kaido Battle 3
    kb3: {
        label: 'Kaido Battle 3',
        filename: 'SLPM-66266_2046216F.pnach',
        ranges: {
            smoothing: { min: 0, max: 2, step: 0.01, value: '0.50' },
            deadzone_low: { min: 0, max: 1, step: 0.01, value: '0.05' },
            midpoint: { min: 0, max: 1, step: 0.01, value: '0.50' },
            deadzone_high: { min: 0, max: 1, step: 0.01, value: '0.95' },
            reduction: { min: 0, max: 20, step: 0.1, value: '1.80' }
        },
        pnachTemplate: ``
    },
    kr2: {
        label: 'Kaido Racer 2 (EU)',
        filename: 'SLES-53421_2046216F.pnach',
        ranges: {
            smoothing: { min: 0, max: 2, step: 0.01, value: '0.50' },
            deadzone_low: { min: 0, max: 1, step: 0.01, value: '0.05' },
            midpoint: { min: 0, max: 1, step: 0.01, value: '0.50' },
            deadzone_high: { min: 0, max: 1, step: 0.01, value: '0.95' },
            reduction: { min: 0, max: 20, step: 0.1, value: '1.80' }
        },
        pnachTemplate: ``
    },
    txrd2: {
        label: 'TXR: Drift 2 (US)',
        filename: 'SLUS-21762_07A4E535.pnach',
        ranges: {
            smoothing: { min: 0.01, max: 1, step: 0.01, value: '0.06' },
            deadzone_low: { min: 0, max: 1, step: 0.01, value: '0.05' },
            midpoint: { min: 0, max: 1, step: 0.01, value: '0.50' },
            deadzone_high: { min: 0, max: 1, step: 0.01, value: '0.95' },
            reduction: { min: 1, max: 36, step: 0.1, value: '18.0' }
        },
        pnachTemplate:
`// TXR DRIFT 2
[Steering\\Smooth Steering]
description=Reduces smooth steering filtering
patch=0,EE,101713F4,extended,{{SMOOTHING_LO}}

[Steering\\Speed Steering Reduction]
description=Reduces the speed-based steering reduction effect
patch=0,EE,0016cc80,word,3C02{{REDUCTION_LO}}
patch=0,EE,0016cc84,word,44820800

[Steering\\Deadzone]
description=Reduces the steering deadzone to minimum
// Deadzone low
patch=0,EE,003d6bc4,word,{{DEADZONE_LOW}}
// Deadzone mid
patch=0,EE,003d6bc8,word,{{DEADZONE_MID}}
// Deadzone high
patch=0,EE,003d6bcc,word,{{DEADZONE_HIGH}}

[Throttle/Brake\\Deadzone]
description=Reduces the throttle and brake deadzone
// Throttle
// Deadzone low
patch=0,EE,003d6b70,word,{{THROTTLE_LOW}}
// Deadzone mid
patch=0,EE,003d6b74,word,{{THROTTLE_MID}}
// Deadzone high
patch=0,EE,003d6b78,word,{{THROTTLE_HIGH}}
// Throttle right stick
// Deadzone low
patch=0,EE,003d6ba0,word,{{THROTTLE_LOW}}
// Deadzone mid
patch=0,EE,003d6ba4,word,{{THROTTLE_MID}}
// Deadzone high
patch=0,EE,003d6ba8,word,{{THROTTLE_HIGH}}
// Brake
// Deadzone low
patch=0,EE,003d6b7c,word,{{BRAKE_LOW}}
// Deadzone mid
patch=0,EE,003d6b80,word,{{BRAKE_MID}}
// Deadzone high
patch=0,EE,003d6b84,word,{{BRAKE_HIGH}}
// Brake right stick
// Deadzone low
patch=0,EE,003d6bac,word,{{BRAKE_LOW}}
// Deadzone mid
patch=0,EE,003d6bb0,word,{{BRAKE_MID}}
// Deadzone high
patch=0,EE,003d6bb4,word,{{BRAKE_HIGH}}
        `
    },
};