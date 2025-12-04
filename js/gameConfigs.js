// game config map
const gameConfigs = {
    //// Kaido Battle 1
    kb1: {
        label: 'Kaido Battle 1',
        filename: 'SLPM-65246_2046216F.pnach',
        ranges: {
            smoothing: { min: 0.01, max: 1, step: 0.01, value: '0.06', isInverse: false },
            reduction: { min: 1, max: 36, step: 0.1, value: '18.0', isInverse: true },
            deadzone_low: { min: 0, max: 1, step: 0.01, value: '0.05', isInverse: false },
            midpoint: { min: 0, max: 1, step: 0.01, value: '0.50', isInverse: false  },
            deadzone_high: { min: 0, max: 1, step: 0.01, value: '0.95', isInverse: false }
        },
        pnachTemplate: ``
    },
    kb1kor: {
        label: 'Kaido Battle 1 (KOR)',
        filename: 'SLKA-25063_E3795E39.pnach',
        ranges: {
            smoothing: { min: 0.01, max: 1, step: 0.01, value: '0.06', isInverse: false },
            reduction: { min: 1, max: 36, step: 0.1, value: '18.0', isInverse: true },
            deadzone_low: { min: 0, max: 1, step: 0.01, value: '0.05', isInverse: false },
            midpoint: { min: 0, max: 1, step: 0.01, value: '0.50', isInverse: false  },
            deadzone_high: { min: 0, max: 1, step: 0.01, value: '0.95', isInverse: false }
        },
        pnachTemplate: ``
    },
    txrd1: {
        label: 'Tokyo Xtreme Racer: Drift',
        filename: 'SLUS-21236_07A4E535.pnach',
        ranges: {
            smoothing: { min: 0.01, max: 1, step: 0.01, value: '0.06', isInverse: false },
            reduction: { min: 1, max: 36, step: 0.1, value: '18.0', isInverse: true },
            deadzone_low: { min: 0, max: 1, step: 0.01, value: '0.05', isInverse: false },
            midpoint: { min: 0, max: 1, step: 0.01, value: '0.50', isInverse: false  },
            deadzone_high: { min: 0, max: 1, step: 0.01, value: '0.95', isInverse: false }
        },
        pnachTemplate: ``
    },
    ///// Kaido Battle 2
    kb2: {
        label: 'Kaido Battle 2',
        filename: 'SLPM-65514_C37C1B76.pnach',
        ranges: {
            smoothing: { min: 0.0020825, max: 0.1666, step: 0.00001, value: '0.01666', isInverse: true },
            reduction: { min: 0, max: 7.2, step: 0.1, value: '3.6', isInverse: false },
            deadzone_low: { min: 0, max: 1, step: 0.01, value: '0.1', isInverse: false },
            midpoint: { min: 0, max: 1, step: 0.01, value: '0.50', isInverse: false  },
            deadzone_high: { min: 0, max: 1, step: 0.01, value: '0.9', isInverse: false }
        },
        pnachTemplate: 
`// KAIDOU BATTLE 2 CHAIN REACTION
[Steering\\Smooth Steering]
description=Modify smooth steering filtering
patch=0,EE,101CE51C,extended,{{SMOOTHING_LO}}

[Steering\\Speed Steering Reduction]
description=Modify the speed-based steering reduction effect
patch=0,EE,101706A0,extended,{{REDUCTION_LO}}

[Steering\\Deadzone]
description=Steering input deadzone
// Deadzone low
patch=0,EE,101c8780,extended,{{DEADZONE_LOW_LO}}
patch=0,EE,101c8784,extended,{{DEADZONE_LOW_HI}}
// Deadzone mid
patch=0,EE,101c8888,extended,{{DEADZONE_MID_LO}}
patch=0,EE,101c888c,extended,{{DEADZONE_MID_HI}}
// Deadzone high
patch=0,EE,101c87c0,extended,{{DEADZONE_MID_M_LOW_LO}} // mid - low
patch=0,EE,101c87c4,extended,{{DEADZONE_MID_M_LOW_HI}}
patch=0,EE,101c87f0,extended,{{DEADZONE_HIGH_M_MID_LO}} // high - mid
patch=0,EE,101c87f8,extended,{{DEADZONE_HIGH_M_MID_HI}}

[Throttle/Brake\\Deadzone]
description=Throttle and brake input deadzone
// Throttle
// Deadzone low
patch=0,EE,101c8d90,extended,{{THROTTLE_LOW_LO}}
patch=0,EE,101c8d94,extended,{{THROTTLE_LOW_HI}}
// Deadzone mid
patch=0,EE,101c8db8,extended,{{THROTTLE_MID_LO}}
// Deadzone high
patch=0,EE,101c8dd4,extended,{{THROTTLE_MID_M_LOW_LO}}
patch=0,EE,101c8dd8,extended,{{THROTTLE_MID_M_LOW_HI}}
// high - mid not adjustable due to compiler optimization

// Brake
// Deadzone low
patch=0,EE,101c8e60,extended,{{BRAKE_LOW_LO}}
patch=0,EE,101c8e64,extended,{{BRAKE_LOW_HI}}
// Deadzone mid
patch=0,EE,101c8e88,extended,{{BRAKE_MID_LO}}
// Deadzone high
patch=0,EE,101c8ea4,extended,{{BRAKE_MID_M_LOW_LO}}
patch=0,EE,101c8ea8,extended,{{BRAKE_MID_M_LOW_HI}}
// high - mid not adjustable due to compiler optimization
`
    },
    kb2kr: {
        label: 'Kaido Battle 2 (Korea)',
        filename: 'SLKA-25146_D285B3DF.pnach',
        ranges: {
            smoothing: { min: 0.0020825, max: 0.1666, step: 0.00001, value: '0.01666', isInverse: true },
            reduction: { min: 0, max: 7.2, step: 0.1, value: '3.6', isInverse: false },
            deadzone_low: { min: 0, max: 1, step: 0.01, value: '0.1', isInverse: false },
            midpoint: { min: 0, max: 1, step: 0.01, value: '0.50', isInverse: false  },
            deadzone_high: { min: 0, max: 1, step: 0.01, value: '0.9', isInverse: false }
        },
        pnachTemplate: 
`// KAIDO BATTLE 2 (Korea)
[Steering\\Smooth Steering]
description=Modify smooth steering filtering
patch=0,EE,101cd33c,extended,{{SMOOTHING_LO}}

[Steering\\Speed Steering Reduction]
description=Modify the speed-based steering reduction effect
patch=0,EE,10170730,extended,{{REDUCTION_LO}}

[Steering\\Deadzone]
description=Steering input deadzone
// Deadzone low
patch=0,EE,101c7560,extended,{{DEADZONE_LOW_LO}}
patch=0,EE,101c7564,extended,{{DEADZONE_LOW_HI}}
// Deadzone mid
patch=0,EE,101c7588,extended,{{DEADZONE_MID_LO}}
patch=0,EE,101c758c,extended,{{DEADZONE_MID_HI}}
// Deadzone high
patch=0,EE,101c75a0,extended,{{DEADZONE_MID_M_LOW_LO}} // mid - low
patch=0,EE,101c75a4,extended,{{DEADZONE_MID_M_LOW_HI}}
patch=0,EE,101c75d0,extended,{{DEADZONE_HIGH_M_MID_LO}} // high - mid
patch=0,EE,101c75d8,extended,{{DEADZONE_HIGH_M_MID_HI}}

[Throttle/Brake\\Deadzone]
description=Throttle and brake input deadzone
// Throttle
// Deadzone low
patch=0,EE,101c7b70,extended,{{THROTTLE_LOW_LO}}
patch=0,EE,101c7b74,extended,{{THROTTLE_LOW_HI}}
// Deadzone mid
patch=0,EE,101c7b98,extended,{{THROTTLE_MID_LO}}
// Deadzone high
patch=0,EE,101c7bb4,extended,{{THROTTLE_MID_M_LOW_LO}}
patch=0,EE,101c7bb8,extended,{{THROTTLE_MID_M_LOW_HI}}
// high - mid not adjustable due to compiler optimization

// Brake
// Deadzone low
patch=0,EE,101c7c40,extended,{{BRAKE_LOW_LO}}
patch=0,EE,101c7c44,extended,{{BRAKE_LOW_HI}}
// Deadzone mid
patch=0,EE,101c7c68,extended,{{BRAKE_MID_LO}}
// Deadzone high
patch=0,EE,101c7c84,extended,{{BRAKE_MID_M_LOW_LO}}
patch=0,EE,101c7c88,extended,{{BRAKE_MID_M_LOW_HI}}
// high - mid not adjustable due to compiler optimization
`
    },
    kr1: {
        label: 'Kaido Racer (EU)',
        filename: 'SLES-53191_F7780E06.pnach',
        ranges: {
            smoothing: { min: 0.0020825, max: 0.1666, step: 0.00001, value: '0.01666', isInverse: true },
            reduction: { min: 0.0, max: 7.2, step: 0.1, value: '3.6', isInverse: false },
            deadzone_low: { min: 0, max: 1, step: 0.01, value: '0.1', isInverse: false },
            midpoint: { min: 0, max: 1, step: 0.01, value: '0.50', isInverse: false  },
            deadzone_high: { min: 0, max: 1, step: 0.01, value: '0.9', isInverse: false }
        },
        pnachTemplate: 
`// KAIDO RACER
[Steering\\Smooth Steering]
description=Modify smooth steering filtering
patch=0,EE,101CE01C,extended,{{SMOOTHING_LO}}

[Steering\\Speed Steering Reduction]
description=Modify the speed-based steering reduction effect
patch=0,EE,1016C134,extended,{{REDUCTION_LO}}

[Steering\\Deadzone]
description=Steering input deadzone
// Deadzone low
patch=0,EE,101c84a8,extended,{{DEADZONE_LOW_LO}}
patch=0,EE,101c84ac,extended,{{DEADZONE_LOW_HI}}
// Deadzone mid
patch=0,EE,101c84c4,extended,{{DEADZONE_MID_LO}}
patch=0,EE,101c84c8,extended,{{DEADZONE_MID_HI}}
// Deadzone high
patch=0,EE,101c84e0,extended,{{DEADZONE_MID_M_LOW_LO}} // mid - low
patch=0,EE,101c84e4,extended,{{DEADZONE_MID_M_LOW_HI}}
patch=0,EE,101c8510,extended,{{DEADZONE_HIGH_M_MID_LO}} // high - mid
patch=0,EE,101c8518,extended,{{DEADZONE_HIGH_M_MID_HI}}

[Throttle/Brake\\Deadzone]
description=Throttle and brake input deadzone
// Throttle
// Deadzone low
patch=0,EE,101c8a58,extended,{{THROTTLE_LOW_LO}}
patch=0,EE,101c8a5c,extended,{{THROTTLE_LOW_HI}}
// Deadzone mid
patch=0,EE,101c8a74,extended,{{THROTTLE_MID_LO}}
// Deadzone high
patch=0,EE,101c8a90,extended,{{THROTTLE_MID_M_LOW_LO}}
patch=0,EE,101c8a94,extended,{{THROTTLE_MID_M_LOW_HI}}
// high - mid not adjustable due to compiler optimization

// Brake
// Deadzone low
patch=0,EE,101c8b20,extended,{{BRAKE_LOW_LO}}
patch=0,EE,101c8b24,extended,{{BRAKE_LOW_HI}}
// Deadzone mid
patch=0,EE,101c8b3c,extended,{{BRAKE_MID_LO}}
// Deadzone high
patch=0,EE,101c8b58,extended,{{BRAKE_MID_M_LOW_LO}}
patch=0,EE,101c8b5c,extended,{{BRAKE_MID_M_LOW_HI}}
// high - mid not adjustable due to compiler optimization
`
    },

    ///// Kaido Battle 3
    kb3: {
        label: 'Kaido Battle 3',
        filename: 'SLPM-66022_EC33CA0D.pnach',
        ranges: {
            smoothing: { min: 0.004165, max: 0.0833, step: 0.00001, value: '0.01666', isInverse: true },
            reduction: { min: 1, max: 18, step: 0.1, value: '9.0', isInverse: true },
            deadzone_low: { min: 0, max: 1, step: 0.01, value: '0.1', isInverse: false },
            midpoint: { min: 0, max: 1, step: 0.01, value: '0.50', isInverse: false  },
            deadzone_high: { min: 0, max: 1, step: 0.01, value: '0.9', isInverse: false }
        },
        pnachTemplate:
`// KAIDOU ~TOUGE NO DENSETSU~ (KB3)
[Steering\\Smooth Steering]
description=Modify smooth steering filtering
patch=0,EE,101709e4,extended,{{SMOOTHING_LO}}

[Steering\\Speed Steering Reduction]
description=Modify the speed-based steering reduction effect
patch=0,EE,0016c270,word,3C02{{REDUCTION_LO}}
patch=0,EE,0016C274,word,44820800

[Steering\\Deadzone]
description=Steering input deadzone
// Deadzone low
patch=0,EE,003d54a4,word,{{DEADZONE_LOW}}
// Deadzone mid
patch=0,EE,003d54c8,word,{{DEADZONE_MID}}
// Deadzone high
patch=0,EE,003d54ac,word,{{DEADZONE_HIGH}}

[Throttle/Brake\\Deadzone]
description=Throttle and brake input deadzone
// Throttle
// Deadzone low
patch=0,EE,003d5450,word,{{THROTTLE_LOW}}
// Deadzone mid
patch=0,EE,003d5454,word,{{THROTTLE_MID}}
// Deadzone high
patch=0,EE,003d5458,word,{{THROTTLE_HIGH}}
// Throttle right stick
// Deadzone low
patch=0,EE,003d5480,word,{{THROTTLE_LOW}}
// Deadzone mid
patch=0,EE,003d5484,word,{{THROTTLE_MID}}
// Deadzone high
patch=0,EE,003d5488,word,{{THROTTLE_HIGH}}
// Brake
// Deadzone low
patch=0,EE,003d545c,word,{{BRAKE_LOW}}
// Deadzone mid
patch=0,EE,003d5460,word,{{BRAKE_MID}}
// Deadzone high
patch=0,EE,003d5464,word,{{BRAKE_HIGH}}
// Brake right stick
// Deadzone low
patch=0,EE,003d548c,word,{{BRAKE_LOW}}
// Deadzone mid
patch=0,EE,003d5490,word,{{BRAKE_MID}}
// Deadzone high
patch=0,EE,003d5494,word,{{BRAKE_HIGH}}
        `
    },
    kr2: {
        label: 'Kaido Racer 2 (EU)',
        filename: 'SLES-53900_C7993BCC.pnach',
        ranges: {
            smoothing: { min: 0.00833, max: 0.04165, step: 0.00001, value: '0.01666', isInverse: true },
            reduction: { min: 1, max: 18, step: 0.1, value: '9.0', isInverse: true },
            deadzone_low: { min: 0, max: 1, step: 0.01, value: '0.1', isInverse: false },
            midpoint: { min: 0, max: 1, step: 0.01, value: '0.50', isInverse: false  },
            deadzone_high: { min: 0, max: 1, step: 0.01, value: '0.9', isInverse: false }
        },
        pnachTemplate:
`// KAIDO RACER 2
[Steering\\Smooth Steering]
description=Modify smooth steering filtering
patch=0,EE,10171264,extended,{{SMOOTHING_LO}}

[Steering\\Speed Steering Reduction]
description=Modify the speed-based steering reduction effect
patch=0,EE,0016caf0,word,3C02{{REDUCTION_LO}}
patch=0,EE,0016caf4,word,44820800

[Steering\\Deadzone]
description=Steering input deadzone
// Deadzone low
patch=0,EE,003deac4,word,{{DEADZONE_LOW}}
// Deadzone mid
patch=0,EE,003deac8,word,{{DEADZONE_MID}}
// Deadzone high
patch=0,EE,003deacc,word,{{DEADZONE_HIGH}}

[Throttle/Brake\\Deadzone]
description=Throttle and brake input deadzone
// Throttle
// Deadzone low
patch=0,EE,003dea70,word,{{THROTTLE_LOW}}
// Deadzone mid
patch=0,EE,003dea74,word,{{THROTTLE_MID}}
// Deadzone high
patch=0,EE,003dea78,word,{{THROTTLE_HIGH}}
// Throttle right stick
// Deadzone low
patch=0,EE,003deaa0,word,{{THROTTLE_LOW}}
// Deadzone mid
patch=0,EE,003deaa4,word,{{THROTTLE_MID}}
// Deadzone high
patch=0,EE,003deaa8,word,{{THROTTLE_HIGH}}
// Brake
// Deadzone low
patch=0,EE,003dea7c,word,{{BRAKE_LOW}}
// Deadzone mid
patch=0,EE,003dea80,word,{{BRAKE_MID}}
// Deadzone high
patch=0,EE,003dea84,word,{{BRAKE_HIGH}}
// Brake right stick
// Deadzone low
patch=0,EE,003deaac,word,{{BRAKE_LOW}}
// Deadzone mid
patch=0,EE,003deab0,word,{{BRAKE_MID}}
// Deadzone high
patch=0,EE,003deab4,word,{{BRAKE_HIGH}}
        `
    },
    txrd2: {
        label: 'TXR: Drift 2 (US)',
        filename: 'SLUS-21394_B32E018E.pnach',
        ranges: {
            smoothing: { min: 0.003328, max: 0.06660, step: 0.00001, value: '0.01666', isInverse: true },
            reduction: { min: 1, max: 18, step: 0.1, value: '9.0', isInverse: true },
            deadzone_low: { min: 0, max: 1, step: 0.01, value: '0.1', isInverse: false },
            midpoint: { min: 0, max: 1, step: 0.01, value: '0.50', isInverse: false  },
            deadzone_high: { min: 0, max: 1, step: 0.01, value: '0.9', isInverse: false }
        },
        pnachTemplate:
`// TXR DRIFT 2
[Steering\\Smooth Steering]
description=Modify smooth steering filtering
patch=0,EE,101713F4,extended,{{SMOOTHING_LO}}

[Steering\\Speed Steering Reduction]
description=Modify the speed-based steering reduction effect
patch=0,EE,0016cc80,word,3C02{{REDUCTION_LO}}
patch=0,EE,0016cc84,word,44820800

[Steering\\Deadzone]
description=Steering input deadzone
// Deadzone low
patch=0,EE,003d6bc4,word,{{DEADZONE_LOW}}
// Deadzone mid
patch=0,EE,003d6bc8,word,{{DEADZONE_MID}}
// Deadzone high
patch=0,EE,003d6bcc,word,{{DEADZONE_HIGH}}

[Throttle/Brake\\Deadzone]
description=Throttle and brake input deadzone
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