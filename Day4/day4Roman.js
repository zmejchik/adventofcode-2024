// https://adventofcode.com/2024/day/4

const main = (
  input = puzzleInput //
    .split("\n")
    .map((line, y) => line.split("").map((c, x) => ({ c, x, y }))),
  // 8x3 array of 3 deltas for each letter in "MAS" in all 8 directions
  MAS_8_ΔΔ = dirs8.map(dir => [1, 2, 3].map(i => ({ x: dir.x * i, y: dir.y * i }))),
  // 4 deltas for each letter in X_MAS diagonals
  MAS_X_ΔΔ = dirs4diag
) => ({
  p1: input
    .flat()
    .filter(({ c }) => c === "X")
    .map(({ x, y }) => MAS_8_ΔΔ.map(ΔΔ => ΔΔ.map(Δ => input[y + Δ.y]?.[x + Δ.x]?.c).join("")))
    .flat()
    .filter(maybeMAS => "MAS" === maybeMAS).length,
  p2: input
    .flat()
    .filter(({ c }) => c === "A")
    .map(({ x, y }) => MAS_X_ΔΔ.map(Δ => input[y + Δ.y]?.[x + Δ.x]?.c ?? "-"))
    .filter(maybe_X_MAS => "SSMM,MSSM,MMSS,SMMS".includes(maybe_X_MAS.join(""))).length,
});

// utils and hacks

const dirs4diag = [{ x: 1, y: 1 }, { x: -1, y: 1 }, { x: -1, y: -1 }, { x: 1, y: -1 }, ...[]];
const dirs8 = [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }, ...dirs4diag];

// inputs

const puzzleInputSAMPLE = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`.trim();

const puzzleInput = `
MXMXMAMXAXMSMMMSSSXSSSMXXMSSXSMSASXSMXSAMXSMMMSMSMMSSXMSMSMSMMMSSMAAXSAMXSMSSMASAMMMSAMXSSSSSSSSXSAXMMMAXMMSSXMASXXSAXSXXAMXSSMSXMSAMXMAMAMX
SMMAMXMSAMXAAAAAXMAMXAMAASAMSXXXAXAXAASAMAAAAAAXMAAAMAMXAAMAAAAAAMMXMSXMASAAAMXMAMAMSAMXXAMAAAAAXMAMSASMXSAASASAXMAMXMASMASASAMXASXMSMSMSSSM
AMSMSMXXAAXXSMSSMMAMSXMASMASAMXMMMMMMMXAMASMMSSSSMMSSMMMSMSSSMMSSMXAASXMASMSMMASMMXXXMASMAMSMMMMMMXMSASMAMMSSXMSXMXMAMAMSAMXSAMSXMAMAAAAAAAA
MMMAAAMMSSSMXAXMAXAMXMXSAMXMAMSAAAAASMSSMMAAAAAAAMAMAMAAAAXMAMAMXMSMXSASMXXMASASAMXMASASMSMMAXXXMASMMMMMAASAXXXXMSAMASAXMXSXMAXMASXXASMSMMMS
XMMSMMAXAAAASAMASMMSMSMMMSSSXMAMXMMMSAAXAMXMMMSMMMASAMMMSSMXXMXXAXAMXSAMXXASAMXSAMAMMMMSAMASMMSMXMAXAAXMASMMMMSSMSASASMSMAMMAMMMAAMSMMAMXXXX
MXMXMASMMSMMMAMAMAAXAAAMAAMXMSSSSXSAXMASXMAXXAXXXXXMMSSXMAXAASMSMSASAMAMAMXMMMXSXSAMMMAMAMAMMAAASMMSSSSMXMASMMAAXSAMXSAXMAMAAXSAMXAAXMAMXXMS
AAMXMMXAXMAMSAMXSMMMSMSMMMSAMMXAAASAMXMMASXSMMSXASAMXAMASAMXMMAAXXMMXSAMXSAAASMMMSMMAMASMMASMSSSXAAAAAXMASAMAMSSMMXMXMXMMSSSSSMXSMSMMSAMMXMX
SXSAMSSSMSXMSASAXAXXAXXXMASASXMSMXMAXXAXXMMSAASMMMSSMSXMMXMMMMSMSMSSMSASXSMSMSASMSMMMSAMAXAAXAMMXMMMMMMSAMXSXMMAXSAMXMASXMAXXXXAXXAMXSSXSAMA
MAMMSAAMAXSAMXMASMXSAMXMMASMMMAMXSMSMSMMSAASMMMAXMAMXAMSASMSAAMAAMAAXMAMAMAMXSAMASAAXMXSAMMMMMSSSXXMASAXSSMMAMSAMXAMXSAMAMXMMSMSSSMMXMAMSASM
XAMXMMSMSMXMASXAXXAMASXAXAXASMSMSAAAAXMASMMMXSSSMMASXMASAMASMSMXMMSSMMXMAMMXMMMMAMXMSAMXXSAXMAAAXMSXMAASASAXAMMASMMMMMMXXSAAAAAAMXSAAXSMSXMM
XMXXXXAAXXXMAMMMSMXSAMASMMSASAMXSMXMXMSMMASXAMAMXSASMXAMAMXMXAXXMAMAXAXSSMSXAAAMXSXMMMMMASASAMMSMMMAXXMMASXMSXSAMAAXMASAAAMSSMSMMAMMSMXASAMX
XSASMSMSMSMMAMAMXAAMASAMSXAXMAMAMXMAXXXMMAMMMSAMXMASMMXMMSSXSSSXMAMAMMMMAAXMMXXSAMASAMXSASAMMAXMXSAMMSXMAMAXXAMXSSMMSAMMSMXXMXMXMASAMAMXMAXX
XAAMAAAAAXXMASMSMMMSAMASMMSXSAMAMAASXMAMMAMAXSMSXMXMMMMSAMXAXAMXSSXSASASMMMMSSMMASAMSXXMAMMMXSMSASASAXAMXSMMMXMAMASAMXSXXXMMAAMAXAMMXXAMSSMS
SMSMSSSMSMSMASMAAAAMASXMMAMASASXXXMXASXMSAMSAMASMMMAAAXMAMMAXXMAXXAMXMASXAXMAAXSAMXXMSXMXMAMAMAMASXMXSXSMMXAAAMMSAMXSXSAMAMAMSSXMMSSSMSXMMAA
XXXAAAMXMAAMSMMXMMXSMMAAMXSASMMMSSSSXMMXMAMMAMXXAASMMXSSXMAMAXMXSMMMAMXMMASMSSMXXMXAMXSAMSMSSMSMMMMMAMMMAXSMSXSAMMMXSMSAMAXSMAXAXSAAAAXAAMSM
SSMMMMMAMMMMXAASAMXXXSMMMMMMSXXXAAXMAXMAXSMXSMXMMMSAAAMXMMSSMMXMAXXMAXMAMXAXMAMMSMMASAMXASXAMAMMAAAXAAAMSMSXMAXMXMSXMASAMXMXMASMMMMSMMMSXMMX
SAMMSMSMSSSMMSMXMAAMXMSMAAMAMXMMMSMMMMSSSXSAXMMMAAMMMMXAXAAAAXMSAMMSASAXSSMXSMSAAXAMMMMXSXMXXAAXXXMSMSMMAAXAMMMSAMXAMXMXMXAXMASXSXXXAMAXAXMM
SMMXAAAAXAASAMXASMSMMAASMSSSXAASAAMAAAXXAAMXMAASMMSAMSSMMMSSMMMMAMAMAXMAAAMMSAMMMSSXAMSMMSSXSSSSMMXAMXXXMXMXAAASASXXMXSAMXSAMXSAMXXSAMASMMSS
MXSSMMMSMSMMXSSMSAAXMSMSXAAXMSSMMSSSSSMMMMMAMSMSAASAMXAXMXAAAAXSAMMSSMXMSXSAMMMMMSASXMAAMAMMAAAAASXMSXMASXMSSMMSAMXAAAXASAMASAMAMMMSAMMXMAAA
XAXAAASXMXAMSAMXMMMMMAAXMMMMAMAXAMMAAAMMXAXAXXAMMMSAMXMMMMMSMMMSASAAAMXAMXMMMXAMXSASMSXSMASAMMMMMMAXSAMMMAAXXSAMXMXAMXXXMASAMMSSMMAXSMAXMMSS
MASMMMSAMXAMMMSAMXXAMMMMXSAMXSAMSSMMSMMASMSSSMSMXXXMASXAMAAXASASXMMXSMASXSSSMSMMAMAMXSAAXXSMXXSSSSSMMSSMSMMMSMXXAXSSSMSSSMMMSXAAXMMSMMMMXMAX
SASAMXSAMSSMAASAMSASXSMXAMXMXMMAAXMMMMMXMAAXMAXASXMMXXSSSMMSAMAMMASAXXAAASAAMASMMMMMAMAMAXSXSXSAMAMAMAXMASASAMMSSMAASMAAASXSSMXSXXXAXAAMXMMM
MASXMASAMAMSMMSXMXAMASAMMMSMMMMMMMXAAAMAMMMMMSMAMAASXMAXAAAMXMAMMAMMSMXMXMSMMASXXAXMASASMMMAMSMAMXMAMSSSXXXMAXMAAMMMMMMSMMSAMXMMXMSXXSSXASAM
MAMAMMSSMAMSMMXMMMSMAMMXMASAMXAASXSMSSSMXMXMMAMASMMMAAMSMMMMASMSMXSMXMAMSMXSMXSXSXMSXSAMAAMXMASXMXSXMXAMAMSSXMMSMMXXAXXAXMMXMAAMAXASMMMMAXAS
MSXSMXMXSSMSAMSAXSAMXMXXMASAMSSXSAXAAMAXXAMXXXSXSAMXXSMAAMXSASMAMSXXAXAMXAAMMMMXXAMSAMXSSMSMXAXMAMAMXMAMXMMAXXAXMSSMSMSMSMMMSMSSMMASXAAAMSMM
XMAMXSMAMXASAMSMMSASMXSXMASMMMMAMMMMMSXMASXXSASXMASMMMXSSMMAASXSMSASMSSMAMMSAASMMMMSAMXAMAMMMSSSMSMMXSMMXMXAMMSMAAAAAAAMAMAXAMMAAMSMXMSMMAAA
XMAXAXMASMMMSMSSXSAMXXMAXAMMAXMXAXMSMAMAXMAAMAMAMAAAAAAMAMAMXSAMAMAMMAXXAMAXXMXAAXASAMXMXMXAMMAXASAMXSAXAMAXMXAMMMSSMSMXAMMMAXSSMMAAAXAAMSSM
XMXMSMSMSAMAMXMXMSASMSSMMSSSMSMSMMMAXMASMMMMMMSAMSSSMSXXAXMXAMAMXMAXMAXSSSXSSSMXSMXSAMMXAMXSMMAMXMAXASASASMSSXXSAAXAMXXMSMMSMMXMMMMXMSSSMAAA
XAMSAAAXSXMASAMAAMAMAMXXAAMAAAXAASXXSMMXAAXXMAMXXXMAXAMSMSMMASAMXMSSMMMAAMASAAMAMXMXAMAMASMAXMASXXXMXSAAAXMAXASXMMSMMASXMAAAASXMMMSAAXAMXMMM
MSMXMMMXSMSASASAXMAMAMMMMMSMSMSSSMMSMAMSXMXAMXXSAMXXXMXAAAXAMMXSXAAAAXMMMMSMSMMAMASXMMMXAMMMMMSMMSMMMMMMMMMSSMMSAMMAMASASAMSSMASAAAMXMMMMXXX
AMAMSASMXAMXXAMASXASASASMXAXAAXXAAMMMAMXAMXSSSMMASXMMXSMSMMMASAMMMSSMXXAXXXAMXMASMMAASXSMMSXMXAAMAAAXSAMXAAXXXAXMMXAMAMMMMAMXXAMMSMMAAAXXXMS
SMMASASMMMMSMAMAMMMSXMXAXMAXMSMSSMMSSSSSSMAXAAASAMAAMXXAAAMMMMASAAMAMMSMSMMMMXSAXXMXMMXAAAMASMSSMSSMSMMSSMSASMMSASMMMXMASXMASMSAAMASXSXMASXS
XAXMMXMASAAAAAMMSMAMMMMMMSSMXAAXAAXMAMAAXMMMXMMMASXSMMMMMXSAXSSMMSSSMAMMAAASAXMASXMSASXSMMMAMXAXXMAMXXAXXXMAAMAMMSAXAXMASXAMAMXMXSAAAMASXMAS
SMMXXAMASXSSSMXAAMMSAXAXMAAXSXMSMMMMAMMMMAAAASASAMAAXAAXAAXMXXMSXXAXMASMSSMSXSMAMAASAMXMAMMSSSMSXSAXSMMSXXMMMAAXXSXMSMSMSAXSXSMSAMMSASMSAMAS
XMAMMSMASMMAXAMSSSXSXSXMMSSMMMXSAMASXSAMSSXSASASMMSMMSSMMMSXMASMXXMSMMSAMMAMXMMSXMMMAMAMAMXAAAAAASMMMAMMMMMMXSMSAMXMAAAAMAMAAMASMSAXXSXSAMAS
MMASAXMXSAMAMMXMAMAMASMXAXAAXMAMAAASXSAXXAAMAMXMAAXAAAXMAMXAXSAMMSXAMSMMMMSAMXAXAXXXXSMSSSMMSMXMXMMXXAMAAMMSMAMSASAMMMMMMAAXXMAMXMASAMASMMAS
ASASMXXAMXMAMXXMXMSMAMAMXSXMMMXSMMMXMSMMSMXMAMAMMSSMMSMSSSSMMXMXAMMMXXAXAAAAMMASMMSMMAXXMAXXAMSMMAAASMSSXSAAXSAXAMXXMXSASMSSXMXXAMXMAMAMAMAS
MMAXXXMMSMSMSMMXXXAMAXMAMMAXAAXAXXXAAMAAXXSMMXXXAMMAMAASXAAMXMXMMSAXMSSMMSSMMMAAAXAASMMMSMMSASMASMMMSAAAAMMSMMXMSMSMSASASAAAXXSSMSSSXMASXMAM
XMASMMSXAXAMAAAMMMMSASMXAXAMXSAMXMSASXMMSMSAMASMMSXAMMSSMXMMXMASASMSXAAAXMAMXMXSAMSXMAAAAAAMXMMMMXXXMMMMMMXMAMXSAAAAMAMAMMMSMXAAAXXAMSXMXMAS
XMMSAAAAMSMSSMMAAAXMXSASMSAMXAMSAAMAXAXXAAXAMAMAAXXMSXXMAXSAXSAMXSAMXXSMMXAMXMAXAMMMSSMSSSXMASAMMXAMXASMMSASMMXAMMMSMAMXMMAAMASMMMSSMSAMASAS
XMAMMMMSXMMAMASXMSXMXMAMAAXMASAXAXSAXAMSXSMMMSMSMMASAXMMSMXAMMSSMMMMMXMASMASXMASAMXAAXMAXMAMAMAXMMMMSMSMASXXAMXXXAXAMXSAXMXMSAMXSAAAXSAMXXMS
AMASAAXXAMAXMAMAAXMMSMSMMMSXXMXMSMMMXAAXXXASMMAMXAXSASMAMAMXMAXXASAAXAXAMSXMXMASAMMMSSMSMSXMSSSMMSAAAASMMMMXAMMMSAMXMMMMSMSMMASAMMSMMMAMXAXS
MSXSMSXSAMMMMSSMMMAAAMAXXXMMXMXAAAAMSSSMMSAMAMAMXSXXAMMASAMMMXSAMSSXMAXSMMXSXMASMMMAMMAXMMXXXAAAASMSMXSAXAMXXSAAXMSXSAXXAAAXSAMXSXMASXSMSMMX
MMAMXMASXMXAAAAAASMMXSMMXXSAAXAMSXMMAAAXAMMMAMAMMMAMMMXAXXXAMAXXXXAMMSMXAMMMAXAMXMMXSMAMASMMMSMMMSMXXSMXMMSAASMSMAAAXMXSMMMMXXMASAXXMAAMAMSM
MMAMMMAMMXSMSSMMMXXAASXSAASMSXMMMXMMMMMMSSMSMSXSAMXXAAMXSSXSMSSMSMAMAMASMMSSMMXMAMSAMMXXAMAAXMSAMXMMMSMASAMMMMAXAMMMMXMXAAMAMXMMSAMSMSMMAAMA
XMASAMAMMMMMMMMMMMMMMSAMMXMMMMSAAAMASAXMMAASAAAXAXSMSSSXAMAXAXAMASAMXSMXMAXAXMASMXASXASMMSSSMMXMXXMAAXXAMXMMASXXSXSMSSMSSXSAMXMMMMMSAMXSMSXS
SSMSXSAXXAAXAAAMASAAAMAMMXXMAAMMSMSASXSXMMMMMMSSSMSAXAMMAMMMMMMXAMMSMMMAMSMXMSASXSMAMAXAAAAAASMSMASMSSMMXSASAXMAAMMMAAAAAMXAMXAAAAAMAMAXAMMM
XAMMXSASMSMSMSMSASXMXSMSSMAMMMSAXXMMSAMXMSXSAXMAMAMMMAMSXSMXMASMMSAAAAMAMMXSXMAXAAXMAMXMMXMMMMAAAXXMAAAAAMXMXSMSMSAMSMMMSMSSMMMSSMSMSMSMMMMM
SMMMAXMAMMMAXMAMMSXSASAAASXMAXMXMMMAMAMXMXAMAMMAMAXMSXMMMMMASXSAXMXSSMSSSMAMAMAMXMMXSAASMSSXXSSMMMMMMXMMSMXMAMAAXMXMAMXMAMAMXAAXXAXMMAMAXSAS
AXXMAMAMASMMSMXMXMAAAXMSMMMMMMMXMASMSASAMMSMAMSXSXSMXMXMAAXMXMMMSMAMAAAAAMAMSMMSMASAAMMSAAXXXMAMXSXAMXSXXMAMASMSSSSSMMASMMSSSMXSMMMXMAMMASAS
SMSMSMSMASAXMMMSAMXMMMXXAAAASASASXSXSASMSAMMAMXAXXSXAAASMSSSSXMAMMAMSMASXMASAAAAMAMXSXAMMMSXMSAMASMXSAMAMXAMXSXAAAAMMXAXAAAMXSASAMASMXSMMMAM
XAXAAAAMSSMMXAAXAMXAXXAXSMSMSASASASXMAMXMASXMXXXAMMASMMXAXAMMAMSXSAXXXXAAXSAXMMSMMMAXAMXAXMAXSXMASMMMMSAXSXSXMMMMMMMMMSSMMMSAMXSXMASMAAXXMAM
MAMMMSMSAMAMSMMSAMSSMMMXAMXMMMMMMAMAXASXMXMAMSAMXAAAMXMMSMSMSAMAAXMASXXSMMMMXXXXXMSSMMXXMMMSMMASMXXXAXMAMSAMXXAXAAMMMAMAAMAMASXSMSSXMSMMXMAS
AAXAAMXMAMAMAAAMXXAAAAXXSMXAMXSMSSSMMAMXXMSAMXMMASMXSAMXMAMXSSSMMSXMMAAXMAAMXSMMMXXMASMASAMAAMAMXAMMSMMSSXAMMSXXSMSAMXSSMMASXMASAXMAXMXAXSMX
SMXSSSMSAMSSMSMSMMSSMSXSASAMXAXMAAAAMAXSSMMAMMSMXMXASMXMMAMXMAXXASMSSMMMSSSMASAAMSASXMXAXASXMMASMAMAMXAXAMAMXSAAXASMSAMXMSMSAMAMAMSMMXMMMASX
ASXXAXAMXMXAMXMAAAMXAAMSAMXXMXMMMXMXMMMXAMSSMAAXXMMASMSMMAMAMXMMMSAXAXAMAXAMASASXSMMAXMASMMMXSASMSMASMMMMSMXAMMMMAMXMASXMAASMMMSMXAMMAAXSAMS
SXSMAMMXXMSMMMXMMSAMMMXMMMMMMAASAMXXMXSSMMAMMSMXAXMXMAAMSSSMSAXXXMMMSSXSSSMMMSXMXSASMMSMXXASXSAXAAMXMAXAXAXMSSMXMAMAXAMMSMXMMAAAXSASXXSXMAMX
XAAMAMXSMMMMAMXSAMAXAXAAAAAAMXMMASMAXSMAXMASMAASMXMXMSMMAAAASMMAXAMXMSAXAXAAXMASASXMAMASAMXMMMAMSMSAMXAMSMSXMAMSSSSXSAMXSMSASMSAXSMSAAMASAMM
MXMAXSAMAAAMASXMASMMMSMXSSSSMAXSAMMSMAXAMMAXXMAXAAMXMXXMMSMMXSSSSXSAAXMMMSSMSMMMMMMSMSMMXXSMXMSMMAXXXAMXAXAMSAMXAAAMSAMXSASXMAMMMMASMAMAMASA
MAXXXMAXSXSSMSAMXMAXMAMAAXMAXMMXXMAMSMMMSXSSXSXXSSMMSSMXMAXAXMMAAASMMMXMXMAAAXXMAAAAXMXSMMMSAMXMMMMSXSXSMSMMXSMMSMXMSSMAMAMXSMXAXMAMMXMASXMM
SSSMMMSMMAAMMMMMAXMXSASMSMSASMMXSASXSMAXXAMMAMMXMAAXAMMAXMMSMSAMMMMMAMAMASMMMMMSSMSXSMAAAMMAMXXAMXXXAMAAXAAMAMMAXXXXMAMXSXMAMXXMMMMSMSMMXXAA
XAXMSAMAMMMSXMASMSXXMASAMAMASASMSAMMMMSSMAMMAMMAMSMMSSSMSSXMAXAMXXASMSMSASXMAXXAMXAASMSSSMMSSSMAMXAMAMSMMSSMAXMASXMAXMMMMAMXMAAXAMXAMAAMSMMM
MXMAMASMMSAAASMMMSMXMAMXMAMASMAAMAMAMAAAMAMSAMSAXAXXAAAMAMMMSMAAXXXSXAAMASMSSSMMSMMSMAAAMAMMAMXAMMMSAMXAXAXXMMMASAAXXSASMSMMSSXSASMSSSXMAAAM
MSMMXMMAAMMMXMMAAMXAMAMAMXMAXXMMSXMSMMSSMXXMAXSMMASXMSMMASAAAMMMSMSMMMMMMMXMAAXAAASXMMMMMAMMAMSASXAMXXAXMMSXMAMSSMSAMSASAXAXAAAMAMAXMAXSSSSS
AAAXSXMMMMMMSASMMXMSMXMAMAMSSMXMSMAAMXAMMXMMSMMMSAMMMMXSASMMSSMAAXAASXXSASAMXMMSSMMAXXMSMMXSAMXXAMXMSAMXAXMASXMMSMMAAMAMAMSMMSMSSMXMMAMMAMAM
SSSMAXXSXSXASAMXSSMMASXMMAMAAAXAMMSMSXSSXSAAMAAMMSMAXMASAXASXAMSSXXAMXASASAXSAMXMASMMMAMMMMMMSXASXSXAAAXAMXMXSAAXXXMMMXMAMXAXXAAXXXXMASMAMAM
XAAXMXAXAAMMSMSAAAAMAMASXSMSSMMXSXMXAMXXAXMSSMMSAMMSMAMMSMXAMMMMAMXSAMMMXMAMMXMAMMASAMAXSXMAAXXMMAMXSMMXSMSXAXMMMMXMASMSMSXMMMMMSSMMMXXMXMAS
SSSMXMSAMXMXMAMXSMMMAMAMXAAAAXAXSASXXMSMMMXXXAXMMMAAAXAAXXXMSXMSMSMXASXMSMAMXSMSMSASXMASXASMMSMMMSMMXMXAMXAMMSMSASXSMSAASXXAAXMSAXAAMSMXMAXX
XMAXXAMASAAAMMMMXMMMSMSSSMMSMMXXMAMXMAAAXXSXMMSMSMSSSXMMMSXXAAMAAAAMXMAAASASXMAMAMAMAMXAXMMAASMAAMXSASMAXASAMAAMAMMAMXXXSXMSASXMASXMMSAXSAMX
XSAMXMSAMXSASXSSXSAAMAAAXXAXXSXXMXMAAMSXSXMAMSAAAMAMXXMAMMMSSSMMSMSMXSMMMXXSAMXMAMMMSAMXSXSMMMMMMSASASMSAMXAXMSMMMSMMAMMMMAMAMXMXMMMXMAMAAMS
MMXAMAMMMMXXXAMXAXMMMMMMMMXSAMASMMXMSXMAXMXAXXMMMSXMSMSASMAMAXMXMAXMXXMXXMXMXMAMXMAXMAMAMXSAMSMSAMASAXAMXMMSMXAAXAMXMAMAAAMMAMXXMAXSAMMMSMMX
AAASXXXAAMMSMAMMMMSASXMSXSAMAMAAAXSXXAMAMMMMXXXSMMXAAAMASMSMAMMSMAMXSAMSSMMSMSSSMXMMSAMXSASAMAAMXSAMXMXMASAXXSMSMAXAMSSSSSXSSSXSXMXMXSXAXXXM
XSXXAAMSMSAAMSMSXAMAMAAAXMASXMSSSMAAMMSMMXASAXAMAASXMSMSXMAMSSXMMSMXMASAAAAAMAMXAASXSSMAMASXMMSMAAAXMMXXXMASAXAXMMMMMMAXAMAXAMMXAMXSXXMSMMMS
AXMMMMMAAMMSMMAMMSSSSMMMMXAMXXMAXAMXMAAAAXAMXXMSMMMASXXMAMXMAMXMAXXXSMMMSMMSMSXMXXSAMXXAMAMAXMAMSSMMASMSMSMSAMXMASASASAMMMMMAMAMAMXAAMAMASAS
AMAAMASMSMAMMMAMXMAXAXXXAMSSMMMMXSXMMSSSMMMSMMXAMASMMXSSMMAMMSXMASMXMAAXXAXXAXMSXXMASMSXSASMMXMXMAMSXXAAXXASXAXSXMASAXXXXAAXSMSAXXXXMMASXMAS
XSSMSASXAMASASAMAMXMSMMMMSXAXMAMMMSAAMAXXAAAAXSASXSXMAMAASXXXSXSXXAASMMMMSXMAMAAXMMMAMSXSMAMAASMSAMSMMMMSXAMMSMMAMMMMMMMMSMSAAMMSMSMXMXXXMAM
XMXAMASMMMMSASMSAXAAASXAXMMMMSSMSAAMXMASXMSXXMMMMAMMMMXSMMXSASMSAXSAMXAXAMMAAMMMXSASAXMAXMAMSASASXMXMSAAAMMMXAASAMSAXXAAAMMAMXMAAAXAXMMMXAXM
XSAMMMMMXSMMMMASASXSMAXSMMAXMXMAMXSSSMASXMXMSSSXMAMXAMXASAXMAMAXAMXSSXMMASXSXSMXSAASASXSSSSMMAMAMMSAASMSXMASXMXSMSMAMSSMSXSXXAMSMXSXMXAMMMSM
MAMXASAMXAAAMMMMAMXAXMAMASASAAMXMAXAAMXMASXAAAMASXXSAMMAMMSMAMXMSMXXMXMSXMAMAMXXAMXMXMMAAAMAXXMXMXSMMMXAAXASASAXXXXAMXMAXXAAMAMAMXMASXMSAAAX
MASXXSASXSMMSASMMMSXMXXSAMASXXMAMXMXMMMSMMMMMSMMXAMMMSMXMAMMMSMMXAMXMMXAMMMMAMSXMXSXAXMMMMMXMMSMSAXMAAMSSMASMMMXMMSASXSASXMSSSSSSXSAMAASMSMS
SAMXXSAMAXAASXSAMASAMXMMAMXMAXMAMMSMAMAAASMMAAMXXMXAAXMSMMMAXSXAMAMAMXAMSAXXAMXAMASXMMAAMASXMXAAMXSSSSMAAMMMMAMXSASMMXMASAXAAXXAAAMXMMMXAMMS
MMSMXMMMAMMMMMSXMASMSAMXSMMSAXMAMAAXMAXXXXAMSSSMSASMSSXMAASXMSMASAXXSXMMSXXSMMSAMASAXASMSASMSAMXMXXXMAMMSMAASXSAMXSAXSMASXMMSMMMMMMMXSMMXMAX
MMAAAXAMAXXXAXXXMXSXSAXXAMXMAXSAMXMAXAMXSSMMAAAAAMXAAXAXMASAAXAAMXSSMMXMMSMAAXMMMSSMMXMXMASAMASAMMMMSSMMAMMXMMMAXMSAMXMASAXAAAMXAXSMAMAMMMXM
SSSSMSMMSMMMMMMMMXMASAMSSMXMAMMXXMASMASAAAXMASMMXXMMMSSMSAMMMMSASMMAAAXAAAXXMMAXMXMAMSSSMMMXMASASXXAAAASMMSAAXSAMXMSSXMXSAMSMSSXMSMMASAMXXXX
AXAAAXAAXASXSMSASAMXMAMAAMAMXSXMSMAMMAMMSMSAMXMSXMMSMAMAMASXMAMAAAMSXMSMSSMSASXMAASAMAXAXAAXMASAMMMMMSAMAASMSMMXSAAXMASMXXMAMMAMMAMSAMASAMMM
MMSMMMMMSAMASASXSSSXSSMMMSAMAXAMAMAMMASXMMMMXAXMAMAAMAXMMXMXMASMSSMXAMMMAAASAMMMSMSXSMSMMMXSMXMAMXAAAMAMMMSXMXXASMSMSMMXMMSMSMAMSAMMMSMMAXMA
XAMXXAAAMAMXMAMMMAMXMAAXASAXSSSSMSASXMSAAXAXXMSSMMSSSSSMASMMMAXXAAXSXMAMMSMMSMXAAXXMSXSMAXMMMSMMSSMSSSSMMXSAMXMMSAXAAXMAAXAXXXAMMXMMAAXSASAM
MSSSMSMSSXMAMXMAMAMAMMMMMSAXMAAAAXXXAASXMMMSMAAAAAAMMAAXMSAAXASMSMMSMXXSAMMAMXMSSMSXSAMXXXAAAAAAXAAAXMAAAAMAMMASMAMXMSSMSSMSMMSSXSMMSSXMASMS
AXAMAAAMXASXSASMMASMMSASMMMMMAMMMXSXMMMXSAAAMMMSMMSSMSMMXSXMSXSAMXSXSXXMASAXXMAMAASMMSMSSMSSSSMMSMMMSSSMMXSAMAMMMAMASXXXAAMAAXAMXMAAAXXMAMXA
MMAMSMSMAMMMXASXSMSAASXSAASAMXMAXSMSMXMASMSSXSAMXMAMAAXMXMAXSXMAMMMAMMMMMMMXMXSMMMMAAAMAAMAMAXMXAAXSMMAAXXSMXSAMSSSXSASMSMSSSMASXSMMSMMMAXSX
XMAMXXXMAMAXMXMAAXMMMMASMMMMXMXXSMAAXAXAXAAAMMMMSAMXSMSXASMMSMSAMAMXMASAXXMAMAMAXXSMMSSSMMMXSAMSAMXSASXMMXMMAXAAAMMMMXMAXAXAAMSMMXSAAXAMXXSM
MSMSSMMSASXXXAMXMMMAAMAMASMSMSMMMMXMSMSSMMMMMAAXXSAMXAMXXXXXXXXASMSMSXSMSMSASMSMMMSAMXAXMAMXMAMAXXASAMMMSAMMMSAMXSASMAMSMSSSMSXSXMASMSXSSMSA
MAMXAAASASXASMXXXASXMMASXMAAAAMSASAXAAAXAMXMSMMMXMXXAAXSXSSXMAMXMASASASAAASAXAAMAAXAMMXXSASXSXMMSMMMSMAASASAAAASAMMASASAAXAXMXAMMSMMMXMAMAXS
MASXSMMSXXMASAASXMSAMSAMAMSMXMMSASMSMMMXSAMXSAXSAMSSSMAXSAMXMASAMXMAMAMXMXMAMSSSMSSMMSAASASAMSAMXMMAMSMXXAMMXSAMAXMMSXSMSMSMXMAXAAAMAMXMMMMM
SMSMXXMXMXXMMMMMAAMAMMASMMMXSXAMAMXAMAAMMMAXMAXXAMAAAMAMMXMXMASMSMMSMXMAMAMXMAAAMAAMAMXMMAMAMXSAMXMAMMMSXAXXAXMSSMSXXAMMMAMXXXMXSXXMAXXXAXAS
AXMMMASAMSAMXMASMMMSMSMMMAMMAMMXMAXXSMXSAMSXMSMSMMMSMMAXMASMMAMMAXMMASMMSAMSSMXMMMMMSSMXMXMXMAXXSASASAAMXMXMASAAAMXASXSASXSMSAAXAASXMMMSMSAS
MAMAXMMASXASMMMXSXAAMAAAMSXMMAMAXAXXAMMSMSMXXAAAXAMAASXMSASMMSMSASMSAMAAXAMAXAASAMSAMXAAXMMAMXSXSASASMXSASXSAMMMSAMXMAAXSAAASXSXMXMAAXXAAMMM
XASMSAMXMXXMAAMAMMSSMSSMXMAAXXSASMSMASAXMAMAMMSMSMXSXMMMMASAAAXMASASAMXMSXMXSMMXAAMXMASMSASAMMXAMXMAXMASASAMXSMSAASMMXMSMMMMMMMAXASMMMMMSMMS
SMSASXSMMMSSSMMAXXAAAXXXAXAMXXMXSAAMAMMMMAXMAXAMXMAXMMAAMXXMASMMMMMMAMXXAASMSASMSMSAMMXXAMXMSSSMMAMXMMAMXMXMAMXMAMMASAXAXAMSAAXMMMSAXMAMXMAS
AAMAMMXMAAAXAASXXMMXMMAMMSSMMAMAMMMMMAAAMASXMXAMXMASASMSXMASMXXSXAASAMMSMMSASAMAMXSASASMSMXSAMAASMSAXMAMSXMMSSMSSSSXMASXXSSSMSXSAAMMMSSSXSAS
MAMMMMASXSMSSMMSSSMMSMXMAAAAXXMAMAXMSSSXSASMMSSMMMXSAMAMMMXMSMMMSXMMAXAMXXMXMSMXMASAMAMAAASMASXMMASMMSSMMAAAMAAAAXAMXXMMAXAMXMASMSXXXSAMAMXS
XASMAMASXMXXMAMAXAAAMASMMSSMMMSMSMSMAAAAMXMAXAMAMSMMMMMMAMMAAXAMXMSSSMASXXSAXASAMXXMMAMXMSXSMMMAMAMMXMMASMMXSMMMSMMAMMAMXMAMAMMMAMAMXMAMSMAS
MAMXAMXXAMAXXAMMSSMMSAMAAAAAXAAMAASMMSMSMMMMMXSAMAAAXAXXAMMSMSSSSXAAMXMXMASMSMSXSMSMSMSXMXMXMASAMXSXAASAMAXAMASXMAXXAMXMASXSASAMMMMMASAMXMAM
MSMXMSMXXMASXMSXAXMXMMSXMSXMMSMSMAMAXMXXAASASASASMSXSAMMAXMXAXAAXMMSMASAMXMAAXXMMAAXAAMMMAAAMXMAAAMMSMMMSAMXSAMASMMMSSMSXSASASXSXMSSXSAMXMAS
AAAXSAMXAMAXAAXMXMAMSASXMMASMMAMXMXSMXMMSMSASXSAMXMMSASXSMXMMMMMMMAAMASXSAMSMXSAMSMSSSMASASXSASXMMSAMMSMSMMMMAMMMAAAAAAMAMMMXMAXAXMAMXAMMMMA
SMSMSAMMMMSMMMMMXSMAMASXMSASAMXMASAMXAXXXAMAMAMMMMMAMAMAMXMAMASAAMAMXXMAXAXXAASMMXAAAAXMMAMXXAMAMAMXSAAAMAXSSSMSSSMMSMMMMSXMAAAXMMMMAXAMXAAM
XAAMMMMXSAMAXSXSAMAMMAMAXMASAMASAMXSSMMMMMMAMAMMAMXSMMMAMASMMAXMMMSSMSAXSXMMMMSMSMMMMMMSMXMMXMSSMMSASXMSMMMXAMAXAXMAMXAAAXASMMMXMAAXSASMSMSX
MMMMASMXMASMMMAMMSSXMASMMMMMMMXMASAMXMASASMMSMMSASMXASXSSXSAMSSMSAMAAMAXSAXXSXSAXASXMSASMASAMMAXXXMMXAMXAXMMSMMMAMMSXMMMSMMMMAAAMSMMXAXAXAAA
SAAMMSAAMAMXAMXMXXMASXXAXMAAAMMSMMMSAMMSASXMSAASASXSXMAAMXSAMXAXMAMMMMMMXAMAXAMAMXSMASAMSMSAXMAMSAMXMSMSMMSMMASMXMAAAMSMXMAASMSMXAMXMAMMMMMS
SSMSXXMXMXSSXMXXMAMXMSSMSSSSMSAAAXAMAXAMAMAMMMMSAMAMXMSMSASAMMMMSMMASAXXXAMMMXMXMXXMAMXMAMMMMXSSXXXSXMAXMASASAMMAMMSSMAASAMXSXAMSMMAMAMMAMAM
MXMSASXXXMXMAMXMMSAMXASXAAXAXMMMMMMSMMSSMSXMASXMMMAMAXAAMASAMXMAAASASAAMSXMAMMMSMXXMXSXSMSMAAXXMMXMXAMAMXXSXMAXSASXAXXMMMMXAMXMMXSSXSSSSSSSS
AAXMASXMXAAMXSSMAXAAMASXMSMSMSSSMAXAMXXAXSAMASMMMSMSSXMXMXMAMXXSSMMXSMMXAAMMMSAAXXMMXMMSAAXASXSAAMAMXMSMXASXSSMSXSMMXXMMAXMSSSMAAMXAMAAXAAAM
SSMMAMAMASMSAAAMAXMSAMMMXAAAAAAAAXSASMSMMSAMAXAAAAAMAMSXSXSXSMXXXMMMXAAXMMMSAMSSMSAMSAAMSMMMXAXXMASXMAXXXXMASXAXMXMAASMSXSXAAAMMSMXXMMMMMMMM
XXASMSAMMMAMMMMMSMMAMAASMMSMMMSMMMMMXAAXASMMSMXMSSSMMMSAMAAAAXXSSMASXMMMXSXMAMXMAMAMMMMXAXXSMXMMMAMAMAMSXMMMMMSMMAMAMMAAAMMMAMXMAMSXMAMAAXXX
MSMMAMMMAMSMSXSAAAMASXMSXAAAXAAMXAXAMSMMASAAMXMXAMAAXAMAMXMSMAMMASAMAAAAASXMXMAXSSSMMAMMXMSMAMSSMXSXMASMXMAMAAXASXSSSMSMSMSXAMAMAMSAMAMSMSAM
AAMMSMASMSMAXAMMXMMXSXASMSMSMSSSSXSXXAAMAXMMSAMMASXMMMSAMXXAXMXSAMMSSMMMMSAASMSMAAAXMAMSAMAMMMAAXAXASXSAMMSMMMSAMAAAAAXAMASXASASXMSXMAXXAMAS
SASAAMXMXAMSMMMSSMSMSMXSAXAMXXMAXASAMXXMMXSAMAMSMMAXAXSMMMMASXMMAMXAAXXMASMMXAMAMSMXSAMSASASAMSSMXSMMMSASAXASAMAMAMSMMMAMAMMAXXMAXMMSSSMASAM
XXMXSXXXSMMXASAXMAAAXAMMAMXAAMMSMMMSAMXXSAMASMMXASXMSMMMAAMAMXMMMXMASASMAXAMMMMXMAXXMMMSAMXMMXMXMASXAASAMAXAMMSSMXAXAMXAMASXMMASXMAAXAAXXMXX
XSSMMASMXMAMMMMSMSMSMAAMAMXMAMAXASAAMSAMMASAMXXSAMXMAMASMSMSXXAASAMMAMXMAMAMSXSXXXSMXMAMMXSXMAMAMXMXMXMXMXMSMMAMMSSSMMSXSAMAASAMASXSMSMMMMMS
XXAAMAMAMSSMXAXMAXAMXXSXMMMSAMASAMSXXMAXSAMXXMAXMAXSASMSAMXAAXSMSASXAAXASXSASAXMSMMMSSSXSAMASXMXSAMXSAMXSAMAAMASAAXAMXSAMASXMMASAMXMAAAAAXAA
XSMMMAMMMAAMSSSMMMMMAAMASAASXSAMXMXXMSMMMXSAASXXSMASASAMXMMMXMMASAMXXMXMMMMAMAMAAAXAAAXAMASMMSAMSASASAMXSASXSMAMMSXXMAMXMAMAASAMXSAMXSSMMMSS
AAAXSMSMMMXMXAAMSAMXSMSAMMXMAMAMXXXMMAAMXAMXMMAASAMMAMXMXMASXMMAMAMXSMMMAXMXMSASMXMMMMMXMAXXAMMASXMASXMXSXMXAMASXMMMMSSMSAMMMMXSASMSAXAXXXAX
SSMMXAAXMASXXSMMSASAMXMAMSAMXMAMXMSAMAMMMXMXSMMMMAMXXXAMXSASAAMXMXMAAAAMSXSAAXMXMXSMMMSAMXXMSMMMMXMXMMSAMXMXMSXSAMASAAAMSSMSSSXMMSXMXMAMMAMX
XAMXMSMSMMXMAXAXSXMAMASAMXMXAAASAAASMSSSXSSXMASASXMAMSASAMASXMMSSMMSSSMMXASMSMAMXAAAAXSASMMMMASXMAXAAXAXXAMAMMMSMMMMMSMMXAXAAXAAXSXSSMAMXSXM
XSMSAAMAXMAMXMMMSXMAMAMXXAXMASASMSMXXMAMAASASASMSAMXMAMAAMAMAXAXAXAXMAXAMAMMMAASMSSSMXMMAAXAXAMASAMSSMMMMXMASAAMASXAMMXSMMMMSMMSMMAAXMXMAMAM
SMASMXSAXMASAMMXMASAMSSSSXSAMXAXAAAXAAAMMMSXMASMSMMMMASXMMSSSMSSMMSMSSMMSASXMSASAMAMXXSSMXMMSXSAMXMMAMAAXMSASXMMAMXXXAMMAAAAAAAAAMMMXMAMASAM
AMAMMMMMXSASAMAASMMMSXAAXMAXMSMMAMMXMMXSMAXAMXMAXXAAAAXASXAAMAXAXAAMMMMXSASAMXMMXMASMXMASXAMAXSMSMXSASMXSAAXMMXMXSMSMMAMSMMSSXMMXXMSASASMSXS
MMASAXAAMMXMXXSMMAAXXMMMMSMAMAAASXSXXSMMMMSSMSMMSSXSMMSAMXMMSSSSMSXSAAXAMXMMMAAXXMAMMMMAAMSMXXMASAMSAMASMXMASXMSXAAXAMSAMAXMAMSXSMMSASASASMS
XSASMSMSSMMMSXMASXMXXXAAMAXMSSMMMAXMAMAASMAMMXAXXAMMAMMASXXXAXMAXAMSXMXAMXMXSXSMSMMMXXMXMSAMXXMAMAXMAMXASAXMXMAMMMMMXMAASAMMAMMAASAMXMXMAMAM
XMAXAMAMAMAAAAMAMMAMSSSMSAMMAMAAMMMSSSMMXMAMSSXMMMASAXXAMAXMASMMMSMSAMMAMSAMXXMAAAAAMXSMMSASMMMSSMMSMMXMSMSMSMMSASMSSMMMMXXXXMMMMMMXAAXSAMMM
SMSMSMAXMSMSSMMMSMAMXAMXMMMMASXMMSAAAMXSMMSSMMMMAMMSMSMASXMASAAMXMAMAMXSAXSAMXSSSMMSAMXAAXAMXAMMAMMASAMXSXAAAAMSMSAAAMXSASMSXMXSASXSXSASMSXX
XAAAXXMMXXAAAAAAAXAMXAMXMMAMAMASMMMSSMXXAMMAAXAXASASAAXXMMMSMXXMAMAMXSMAAXAXSAMAXAAXMXSMMSMXSSSMAMMASXSAMSSSMSMMXMMMXSAMMSAAAMASXSAAAMXMAMMM
MSMSMASMSMMMSSMSXSSSSXMSMSASASAMXAAAAXMAMSSSMSSSMSMMSMSXMASASASXMSXSAMXMMMMMMASAMMXMSMAMAAMXXMAMXSMMMMMAXAXAAXXMASAAAMASXXMSSMASAMXMXMSMSXAA
AXSXXMAAMXSXXMAXASAMXAAXASASXSAXXMMSSSXSXMAMAAAAASXXAMAMSMSASMAAAXAMXXXMAXAAXAMXXXMMXSASMXSASMSMAMXMASXMMXSMXMASASMSSSSMMAMAXMXMAMAXAXAAXXSM
XSAMXXMXMAAAMAAMXMASXXMMMMAMASXMSMAAAAAMMMAMXMXMMMXSAMXMAMMAMXSMMMXMSAMSASXMSAMAMSMMASXSAAXXAAAMASMSMSAAXMXXASMMAMXXAMXASXMASMSAMXMSXSAMXXMM
MMMMMXXAMSSXAMXMSSSMMAAXXMXMAMXMAMMSSMXMASMSXXXSXSXSXMAXAXMXMAMMXSXAMMAAXMAMMXMAMAAMAMXMMMMSMXMXAMXAASMMMMMSASXSMSMMSASMMSMAXAMAMMMAXSAMSAMX
SASASXMMXAXXMXSSMXMAXSAMXMXMAMMSAMXXXXXSAMAAAMXMASAXAXSSSXSAMXSXAMMMMXSXXMXMMSSSSXSMSSXXAAAXAASMSMSMXMMMXAAMXMAXAAAAAMXAASMMSSMMMAMMXSAMMAMM
SASASMSSSMMSMMMAMMSAMAMSAMXSASAAASMMAXAMMSXMASAMAMMSSMMAAAMASAXMASAMSAMMSMMAAXAAAAXAMXMMSSSMXMSAAAXMXAAMSSXSSXAMSMMMSSSMMMMAAMASASMMAMSMXAMX
MAMMMAAAAXAAAASAMAMSSXMAXXMSASXMSAASAMXMASAXXAAMXSAAAAMMMMSAMXSAXSASMAMSAASMMSMMMMMAMXAAXAAAXXMMMSMSSMMMAMXXAMMXAAMAAXAXMAMMMSAMAXAMXSAMSXSX
MXMSMSMSMMSSSMSASAMXMASMXSXMAMXXMXXMXXMAMSAMXSMMMMMSSXMXXMAMXXSAMMMMMXMMSXMAMSXXMMSSMXSSMSMMXXSSXXAXAMXMASXMASXSSSMMSSSMSASAXMASXSSMMSXMSAMX`.trim();

require("util").inspect.defaultOptions.depth = null;
console.log(main());