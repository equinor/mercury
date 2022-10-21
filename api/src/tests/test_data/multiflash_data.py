from typing import Dict, NamedTuple

import numpy as np

from common.utils.tuples import ComponentFractions, PhaseLabels, PhaseValues
from entities.Components import ComponentIds
from entities.Multiflash import MultiflashResult


class InputArguments(NamedTuple):
    case_1: Dict = {
        "component_composition": {
            "id3": 0.062202,
            "id2": 0.0047,
            "id1": 0.046539,
            "id101": 0.65364,
            "id201": 0.086307,
            "id301": 0.045563,
            "id401": 0.007579,
            "id402": 0.015481,
            "id503": 0.005188,
            "id504": 0.00612,
            "id605": 0.066681,
            "id5": 0.001,
        },
        "temperature": 10,
        "pressure": 35,
    }
    case_2: Dict = {
        "component_composition": {
            "id2": 0.0169,
            "id1": 0.0539,
            "id101": 0.854808,
            "id201": 0.045685,
            "id301": 0.0176,
            "id401": 0.00242,
            "id402": 0.00437,
            "id503": 0.00121,
            "id504": 0.0011,
            "id608": 0.000147,
            "id710": 0.000084,
            "id809": 0.000023,
            "id5": 0.001,
        },
        "temperature": 5,
        "pressure": 70,
    }
    case_3: Dict = {
        "component_composition": {
            "id1": 0.026457,
            "id2": 0.005817,
            "id101": 0.874382,
            "id201": 0.059121,
            "id301": 0.023115,
            "id401": 0.002947,
            "id402": 0.005235,
            "id503": 0.001027,
            "id504": 0.000994,
            "id5": 0.001,
        },
        "temperature": -69,
        "pressure": 36.51,
    }


class OutputArgumentsEntityTest(NamedTuple):
    case_1: MultiflashResult = MultiflashResult(
        phase_values={
            PhaseLabels.VAPOR: PhaseValues(percentage=0.7889194452, mercury=252.15087669),
            PhaseLabels.LIQUID: PhaseValues(percentage=0.1485055781, mercury=1492.7149426),
            PhaseLabels.AQUEOUS: PhaseValues(percentage=0.0615760650, mercury=41.540651304),
            PhaseLabels.MERCURY: PhaseValues(percentage=0.0009989116, mercury=1000000000.0),
        },
        component_fractions={
            "id3": ComponentFractions(
                moles=np.array([0.00044930000, 0.0023390000, 0.997800000000, 0.00000000000000000000000006834]),
                mass=np.array([0.000391000, 0.000709200, 0.99590000000, 0.000000000000000000000000006138]),
            ),
            "id2": ComponentFractions(
                moles=np.array([0.00588400000, 0.0003604000, 0.000002575000, 0.00000000000000000000000116800]),
                mass=np.array([0.007962000, 0.000169900, 0.00000399600, 0.000000000000000000000000163200]),
            ),
            "id1": ComponentFractions(
                moles=np.array([0.05393000000, 0.0261200000, 0.001117000000, 0.00000000000000000000000848600]),
                mass=np.array([0.114700000, 0.019340000, 0.00272400000, 0.000000000000000000000001862000]),
            ),
            "id101": ComponentFractions(
                moles=np.array([0.79800000000, 0.1574000000, 0.000848000000, 0.00000000000000000000014150000]),
                mass=np.array([0.618400000, 0.042500000, 0.00075370000, 0.000000000000000000000011310000]),
            ),
            "id201": ComponentFractions(
                moles=np.array([0.09056000000, 0.0994700000, 0.000115900000, 0.00000000000000000000001295000]),
                mass=np.array([0.131500000, 0.050340000, 0.00019300000, 0.000000000000000000000001941000]),
            ),
            "id301": ComponentFractions(
                moles=np.array([0.03492000000, 0.1210000000, 0.000123300000, 0.00000000000000000000000415900]),
                mass=np.array([0.074380000, 0.089750000, 0.00030120000, 0.000000000000000000000000914300]),
            ),
            "id401": ComponentFractions(
                moles=np.array([0.00381700000, 0.0307000000, 0.000007368000, 0.00000000000000000000000039850]),
                mass=np.array([0.010720000, 0.030030000, 0.00002373000, 0.000000000000000000000000115500]),
            ),
            "id402": ComponentFractions(
                moles=np.array([0.00626500000, 0.0708500000, 0.000017830000, 0.00000000000000000000000063080]),
                mass=np.array([0.017590000, 0.069300000, 0.00005743000, 0.000000000000000000000000182800]),
            ),
            "id503": ComponentFractions(
                moles=np.array([0.00109400000, 0.0290900000, 0.000001688000, 0.00000000000000000000000009668]),
                mass=np.array([0.003813000, 0.035320000, 0.00000675000, 0.000000000000000000000000034780]),
            ),
            "id504": ComponentFractions(
                moles=np.array([0.00102000000, 0.0357500000, 0.000002269000, 0.00000000000000000000000008706]),
                mass=np.array([0.003555000, 0.043410000, 0.00000906800, 0.000000000000000000000000031310]),
            ),
            "id605": ComponentFractions(
                moles=np.array([0.00407000000, 0.4269000000, 0.000006839000, 0.00000000000000000000000029550]),
                mass=np.array([0.016950000, 0.619100000, 0.00003265000, 0.000000000000000000000000127000]),
            ),
            "id5": ComponentFractions(
                moles=np.array([0.00000002972, 0.0000004422, 0.000000003738, 1.00000000000000000000000000000]),
                mass=np.array([0.000000288, 0.000001493, 0.00000004154, 1.000000000000000000000000000000]),
            ),
        },
    )

    case_2: MultiflashResult = MultiflashResult(
        phase_values={
            PhaseLabels.VAPOR: PhaseValues(percentage=0.9989992588, mercury=104.82781237),
            PhaseLabels.MERCURY: PhaseValues(percentage=0.0010007412, mercury=1000000000.0),
        },
        component_fractions={
            "id2": ComponentFractions(
                moles=np.array([0.016930000000, 0.000000000000000000000003431000]),
                mass=np.array([0.02454000000, 0.000000000000000000000000479100]),
            ),
            "id1": ComponentFractions(
                moles=np.array([0.053990000000, 0.000000000000000000000006807000]),
                mass=np.array([0.12300000000, 0.000000000000000000000001493000]),
            ),
            "id101": ComponentFractions(
                moles=np.array([0.856300000000, 0.000000000000000000000137900000]),
                mass=np.array([0.71080000000, 0.000000000000000000000011030000]),
            ),
            "id201": ComponentFractions(
                moles=np.array([0.045770000000, 0.000000000000000000000004810000]),
                mass=np.array([0.07121000000, 0.000000000000000000000000721100]),
            ),
            "id301": ComponentFractions(
                moles=np.array([0.017630000000, 0.000000000000000000000001301000]),
                mass=np.array([0.04023000000, 0.000000000000000000000000285900]),
            ),
            "id401": ComponentFractions(
                moles=np.array([0.002424000000, 0.000000000000000000000000138900]),
                mass=np.array([0.00729100000, 0.000000000000000000000000040240]),
            ),
            "id402": ComponentFractions(
                moles=np.array([0.004378000000, 0.000000000000000000000000232400]),
                mass=np.array([0.01317000000, 0.000000000000000000000000067340]),
            ),
            "id503": ComponentFractions(
                moles=np.array([0.001212000000, 0.000000000000000000000000050060]),
                mass=np.array([0.00452500000, 0.000000000000000000000000018010]),
            ),
            "id504": ComponentFractions(
                moles=np.array([0.001102000000, 0.000000000000000000000000042380]),
                mass=np.array([0.00411400000, 0.000000000000000000000000015240]),
            ),
            "id608": ComponentFractions(
                moles=np.array([0.000147300000, 0.000000000000000000000000005109]),
                mass=np.array([0.00059520000, 0.000000000000000000000000001990]),
            ),
            "id710": ComponentFractions(
                moles=np.array([0.000084150000, 0.000000000000000000000000002175]),
                mass=np.array([0.00040120000, 0.000000000000000000000000000999]),
            ),
            "id809": ComponentFractions(
                moles=np.array([0.000023040000, 0.000000000000000000000000000433]),
                mass=np.array([0.00012660000, 0.000000000000000000000000000229]),
            ),
            "id5": ComponentFractions(
                moles=np.array([0.000000012360, 1.000000000000000000000000000000]),
                mass=np.array([0.00000012830, 1.000000000000000000000000000000]),
            ),
        },
    )

    case_3: MultiflashResult = MultiflashResult(
        phase_values={
            PhaseLabels.VAPOR: PhaseValues(percentage=0.8323991912, mercury=0.0162210014),
            PhaseLabels.LIQUID: PhaseValues(percentage=0.1666009038, mercury=0.7598891939),
            PhaseLabels.MERCURY: PhaseValues(percentage=0.0009999050, mercury=1000000000.0),
        },
        component_fractions={
            "id1": ComponentFractions(
                moles=np.array([0.022550000000000, 0.000000000000000000000002575000, 0.04614000000000]),
                mass=np.array([0.0571800000000, 0.000000000000000000000000564900, 0.0781900000000]),
            ),
            "id2": ComponentFractions(
                moles=np.array([0.006758000000000, 0.000000000000000000000001322000, 0.00114600000000]),
                mass=np.array([0.0109100000000, 0.000000000000000000000000184700, 0.0012360000000]),
            ),
            "id101": ComponentFractions(
                moles=np.array([0.933100000000000, 0.000000000000000000000138200000, 0.58570000000000]),
                mass=np.array([0.8627000000000, 0.000000000000000000000011060000, 0.3618000000000]),
            ),
            "id201": ComponentFractions(
                moles=np.array([0.032910000000000, 0.000000000000000000000002795000, 0.19040000000000]),
                mass=np.array([0.0570300000000, 0.000000000000000000000000419000, 0.2205000000000]),
            ),
            "id301": ComponentFractions(
                moles=np.array([0.004217000000000, 0.000000000000000000000000220600, 0.11770000000000]),
                mass=np.array([0.0107200000000, 0.000000000000000000000000048490, 0.1998000000000]),
            ),
            "id401": ComponentFractions(
                moles=np.array([0.000195000000000, 0.000000000000000000000000007183, 0.01671000000000]),
                mass=np.array([0.0006533000000, 0.000000000000000000000000002081, 0.0374000000000]),
            ),
            "id402": ComponentFractions(
                moles=np.array([0.000227300000000, 0.000000000000000000000000007619, 0.03028000000000]),
                mass=np.array([0.0007614000000, 0.000000000000000000000000002208, 0.0677800000000]),
            ),
            "id503": ComponentFractions(
                moles=np.array([0.000014630000000, 0.000000000000000000000000000346, 0.00609100000000]),
                mass=np.array([0.0000608100000, 0.000000000000000000000000000125, 0.0169200000000]),
            ),
            "id504": ComponentFractions(
                moles=np.array([0.000009358000000, 0.000000000000000000000000000200, 0.00591900000000]),
                mass=np.array([0.0000389100000, 0.000000000000000000000000000072, 0.0164400000000]),
            ),
            "id5": ComponentFractions(
                moles=np.array([0.000000000001912, 1.000000000000000000000000000000, 0.00000000009838]),
                mass=np.array([0.0000000000221, 1.000000000000000000000000000000, 0.0000000007599]),
            ),
        },
    )


class OutputArgumentsUseCaseTest(NamedTuple):
    case_1: dict = {
        "component_ids": [
            ComponentIds["id_3"],
            ComponentIds["id_2"],
            ComponentIds["id_1"],
            ComponentIds["id_101"],
            ComponentIds["id_201"],
            ComponentIds["id_301"],
            ComponentIds["id_401"],
            ComponentIds["id_402"],
            ComponentIds["id_503"],
            ComponentIds["id_504"],
            ComponentIds["id_605"],
            ComponentIds["id_5"],
        ],
        "phases": [PhaseLabels.VAPOR, PhaseLabels.LIQUID, PhaseLabels.AQUEOUS, PhaseLabels.MERCURY],
        "phase_values": {
            PhaseLabels.VAPOR: {
                "ratio": 0.7889194452,
                "mercury_concentration": 252.15087669,
                "mole_fractions": [
                    0.00044930000,
                    0.00588400000,
                    0.05393000000,
                    0.79800000000,
                    0.09056000000,
                    0.03492000000,
                    0.00381700000,
                    0.00626500000,
                    0.00109400000,
                    0.00102000000,
                    0.00407000000,
                    0.00000002972,
                ],
            },
            PhaseLabels.LIQUID: {
                "ratio": 0.1485055781,
                "mercury_concentration": 1492.7149426,
                "mole_fractions": [
                    0.0023390000,
                    0.0003604000,
                    0.0261200000,
                    0.1574000000,
                    0.0994700000,
                    0.1210000000,
                    0.0307000000,
                    0.0708500000,
                    0.0290900000,
                    0.0357500000,
                    0.4269000000,
                    0.0000004422,
                ],
            },
            PhaseLabels.AQUEOUS: {
                "ratio": 0.0615760650,
                "mercury_concentration": 41.540651304,
                "mole_fractions": [
                    0.997800000000,
                    0.000002575000,
                    0.001117000000,
                    0.000848000000,
                    0.000115900000,
                    0.000123300000,
                    0.000007368000,
                    0.000017830000,
                    0.000001688000,
                    0.000002269000,
                    0.000006839000,
                    0.000000003738,
                ],
            },
            PhaseLabels.MERCURY: {
                "ratio": 0.0009989116,
                "mercury_concentration": 1000000000.0,
                "mole_fractions": [
                    0.00000000000000000000000006834,
                    0.00000000000000000000000116800,
                    0.00000000000000000000000848600,
                    0.00000000000000000000014150000,
                    0.00000000000000000000001295000,
                    0.00000000000000000000000415900,
                    0.00000000000000000000000039850,
                    0.00000000000000000000000063080,
                    0.00000000000000000000000009668,
                    0.00000000000000000000000008706,
                    0.00000000000000000000000029550,
                    1.00000000000000000000000000000,
                ],
            },
        },
    }
    case_2: dict = {
        "component_ids": [
            ComponentIds["id_2"],
            ComponentIds["id_1"],
            ComponentIds["id_101"],
            ComponentIds["id_201"],
            ComponentIds["id_301"],
            ComponentIds["id_401"],
            ComponentIds["id_402"],
            ComponentIds["id_503"],
            ComponentIds["id_504"],
            ComponentIds["id_608"],
            ComponentIds["id_710"],
            ComponentIds["id_809"],
            ComponentIds["id_5"],
        ],
        "phases": [PhaseLabels.VAPOR, PhaseLabels.MERCURY],
        "phase_values": {
            PhaseLabels.VAPOR: {
                "ratio": 0.9989992588,
                "mercury_concentration": 104.82781237,
                "mole_fractions": [
                    0.016930000000,
                    0.053990000000,
                    0.856300000000,
                    0.045770000000,
                    0.017630000000,
                    0.002424000000,
                    0.004378000000,
                    0.001212000000,
                    0.001102000000,
                    0.000147300000,
                    0.000084150000,
                    0.000023040000,
                    0.000000012360,
                ],
            },
            PhaseLabels.MERCURY: {
                "ratio": 0.0010007412,
                "mercury_concentration": 1000000000.0,
                "mole_fractions": [
                    0.000000000000000000000003431000,
                    0.000000000000000000000006807000,
                    0.000000000000000000000137900000,
                    0.000000000000000000000004810000,
                    0.000000000000000000000001301000,
                    0.000000000000000000000000138900,
                    0.000000000000000000000000232400,
                    0.000000000000000000000000050060,
                    0.000000000000000000000000042380,
                    0.000000000000000000000000005109,
                    0.000000000000000000000000002175,
                    0.000000000000000000000000000433,
                    1.000000000000000000000000000000,
                ],
            },
        },
    }
    case_3: dict = {
        "component_ids": [
            ComponentIds["id_1"],
            ComponentIds["id_2"],
            ComponentIds["id_101"],
            ComponentIds["id_201"],
            ComponentIds["id_301"],
            ComponentIds["id_401"],
            ComponentIds["id_402"],
            ComponentIds["id_503"],
            ComponentIds["id_504"],
            ComponentIds["id_5"],
        ],
        "phases": [PhaseLabels.VAPOR, PhaseLabels.MERCURY, PhaseLabels.LIQUID],
        "phase_values": {
            PhaseLabels.VAPOR: {
                "ratio": 0.8323991912,
                "mercury_concentration": 0.0162210014,
                "mole_fractions": [
                    0.022550000000000,
                    0.006758000000000,
                    0.933100000000000,
                    0.032910000000000,
                    0.004217000000000,
                    0.000195000000000,
                    0.000227300000000,
                    0.000014630000000,
                    0.000009358000000,
                    0.000000000001912,
                ],
            },
            PhaseLabels.LIQUID: {
                "ratio": 0.1666009038,
                "mercury_concentration": 0.7598891939,
                "mole_fractions": [
                    0.04614000000000,
                    0.00114600000000,
                    0.58570000000000,
                    0.19040000000000,
                    0.11770000000000,
                    0.01671000000000,
                    0.03028000000000,
                    0.00609100000000,
                    0.00591900000000,
                    0.00000000009838,
                ],
            },
            PhaseLabels.MERCURY: {
                "ratio": 0.0009999050,
                "mercury_concentration": 1000000000.0,
                "mole_fractions": [
                    0.000000000000000000000002575000,
                    0.000000000000000000000001322000,
                    0.000000000000000000000138200000,
                    0.000000000000000000000002795000,
                    0.000000000000000000000000220600,
                    0.000000000000000000000000007183,
                    0.000000000000000000000000007619,
                    0.000000000000000000000000000346,
                    0.000000000000000000000000000200,
                    1.000000000000000000000000000000,
                ],
            },
        },
    }


class OutputArgumentsFeatureTest(NamedTuple):
    case_1: dict = {
        "componentIds": [
            "id3",
            "id2",
            "id1",
            "id101",
            "id201",
            "id301",
            "id401",
            "id402",
            "id503",
            "id504",
            "id605",
            "id5",
        ],
        "phases": ["vapor", "liquid", "aqueous", "mercury"],
        "phaseValues": {
            "Vapor": {
                "ratio": 0.7889194452,
                "mercuryConcentration": 252.15087669,
                "moleFractions": [
                    0.00044930000,
                    0.00588400000,
                    0.05393000000,
                    0.79800000000,
                    0.09056000000,
                    0.03492000000,
                    0.00381700000,
                    0.00626500000,
                    0.00109400000,
                    0.00102000000,
                    0.00407000000,
                    0.00000002972,
                ],
            },
            "Liquid": {
                "ratio": 0.1485055781,
                "mercuryConcentration": 1492.7149426,
                "moleFractions": [
                    0.0023390000,
                    0.0003604000,
                    0.0261200000,
                    0.1574000000,
                    0.0994700000,
                    0.1210000000,
                    0.0307000000,
                    0.0708500000,
                    0.0290900000,
                    0.0357500000,
                    0.4269000000,
                    0.0000004422,
                ],
            },
            "Aqueous": {
                "ratio": 0.0615760650,
                "mercuryConcentration": 41.540651304,
                "moleFractions": [
                    0.997800000000,
                    0.000002575000,
                    0.001117000000,
                    0.000848000000,
                    0.000115900000,
                    0.000123300000,
                    0.000007368000,
                    0.000017830000,
                    0.000001688000,
                    0.000002269000,
                    0.000006839000,
                    0.000000003738,
                ],
            },
            "Mercury": {
                "ratio": 0.0009989116,
                "mercuryConcentration": 1000000000.0,
                "moleFractions": [
                    0.00000000000000000000000006834,
                    0.00000000000000000000000116800,
                    0.00000000000000000000000848600,
                    0.00000000000000000000014150000,
                    0.00000000000000000000001295000,
                    0.00000000000000000000000415900,
                    0.00000000000000000000000039850,
                    0.00000000000000000000000063080,
                    0.00000000000000000000000009668,
                    0.00000000000000000000000008706,
                    0.00000000000000000000000029550,
                    1.00000000000000000000000000000,
                ],
            },
        },
    }
    case_2: dict = {
        "componentIds": [
            "id2",
            "id1",
            "id101",
            "id201",
            "id301",
            "id401",
            "id402",
            "id503",
            "id504",
            "id608",
            "id710",
            "id809",
            "id5",
        ],
        "phases": ["vapor", "mercury"],
        "phaseValues": {
            "Vapor": {
                "ratio": 0.9989992588,
                "mercuryConcentration": 104.82781237,
                "moleFractions": [
                    0.016930000000,
                    0.053990000000,
                    0.856300000000,
                    0.045770000000,
                    0.017630000000,
                    0.002424000000,
                    0.004378000000,
                    0.001212000000,
                    0.001102000000,
                    0.000147300000,
                    0.000084150000,
                    0.000023040000,
                    0.000000012360,
                ],
            },
            "Mercury": {
                "ratio": 0.0010007412,
                "mercuryConcentration": 1000000000.0,
                "moleFractions": [
                    0.000000000000000000000003431000,
                    0.000000000000000000000006807000,
                    0.000000000000000000000137900000,
                    0.000000000000000000000004810000,
                    0.000000000000000000000001301000,
                    0.000000000000000000000000138900,
                    0.000000000000000000000000232400,
                    0.000000000000000000000000050060,
                    0.000000000000000000000000042380,
                    0.000000000000000000000000005109,
                    0.000000000000000000000000002175,
                    0.000000000000000000000000000433,
                    1.000000000000000000000000000000,
                ],
            },
        },
    }
    case_3: dict = {
        "componentIds": ["id1", "id2", "id101", "id201", "id301", "id401", "id402", "id503", "id504", "id5"],
        "phases": ["vapor", "mercury", "liquid"],
        "phaseValues": {
            "Vapor": {
                "ratio": 0.8323991912,
                "mercuryConcentration": 0.0162210014,
                "moleFractions": [
                    0.022550000000000,
                    0.006758000000000,
                    0.933100000000000,
                    0.032910000000000,
                    0.004217000000000,
                    0.000195000000000,
                    0.000227300000000,
                    0.000014630000000,
                    0.000009358000000,
                    0.000000000001912,
                ],
            },
            "Liquid": {
                "ratio": 0.1666009038,
                "mercuryConcentration": 0.7598891939,
                "moleFractions": [
                    0.04614000000000,
                    0.00114600000000,
                    0.58570000000000,
                    0.19040000000000,
                    0.11770000000000,
                    0.01671000000000,
                    0.03028000000000,
                    0.00609100000000,
                    0.00591900000000,
                    0.00000000009838,
                ],
            },
            "Mercury": {
                "ratio": 0.0009999050,
                "mercuryConcentration": 1000000000.0,
                "moleFractions": [
                    0.000000000000000000000002575000,
                    0.000000000000000000000001322000,
                    0.000000000000000000000138200000,
                    0.000000000000000000000002795000,
                    0.000000000000000000000000220600,
                    0.000000000000000000000000007183,
                    0.000000000000000000000000007619,
                    0.000000000000000000000000000346,
                    0.000000000000000000000000000200,
                    1.000000000000000000000000000000,
                ],
            },
        },
    }


MultiflashInput = InputArguments()
MultiflashEntityOutput = OutputArgumentsEntityTest()
MultiflashUseCaseOutput = OutputArgumentsUseCaseTest()
MultiflashFeatureOutput = OutputArgumentsFeatureTest()
