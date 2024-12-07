// https://adventofcode.com/2024/day/7

const main = (
  input = puzzleInput.split("\n").map((line) => ({
    testv: BigInt(line.split(": ")[0]),
    nums: line.split(": ")[1].split(" ").map(BigInt),
  })),
  fns = {
    add: (n1, n2) => n1 + n2,
    mul: (n1, n2) => n1 * n2,
    concat: (n1, n2) => BigInt(n1 + "" + n2),
  },
  // treeOfVariants(1, [2, 3, 4], [+, *]) -> [ 10, 24, 13, 36, 9, 20, 10, 24 ]
  treeOfVariants = (n1, [n2, ...rest], fns) =>
    !n2 ? n1 : fns.map((fn) => treeOfVariants(fn(n1, n2), rest, fns)).flat(),
  solve = (input, fns) =>
    input
      .filter(({ testv, nums }) =>
        treeOfVariants(nums[0], nums.slice(1), fns).includes(testv)
      )
      .map((x) => x.testv)
      .reduce((a, b) => a + b)
) => ({
  p1: solve(input, [fns.add, fns.mul]),
  p2: solve(input, [fns.add, fns.mul, fns.concat]),
});

// utils and hacks

// inputs

const puzzleInputSAMPLE = `
  190: 10 19
  3267: 81 40 27
  83: 17 5
  156: 15 6
  7290: 6 8 6 15
  161011: 16 10 13
  192: 17 8 14
  21037: 9 7 18 13
  292: 11 6 16 20`.trim();

const puzzleInput = `590877201219: 9 985 5 9 7 8 76 8 174
  341481: 7 3 31 915 25 394 9 75
  4060: 4 35 47 1 3 5 4 3 8 1 895
  10555865325: 7 7 2 2 78 6 546 9 81 5
  589800341: 996 79 4 5 11 2 137
  499: 2 9 9 5 4
  14644280: 35 996 84 616 5
  58781: 2 5 4 337 6 7 3 1 4 7 3 6
  78542: 8 777 44
  75387319: 7 76 6 7 4 2 9 7 6 9 8 318
  156833006145: 2 87 6 1 6 23 8 898 1 47
  23407953580: 4 9 2 476 260 683
  16536082970: 50 836 40 3 989
  263150646: 30 22 2 72 87 5 1
  8008759260192: 3 35 9 3 46 10 7 83 32
  2988763: 82 185 8 149 3 65
  292548726: 2 4 7 4 4 2 9 9 7 5 38 27
  116759788099: 2 955 944 395 99
  3716625: 365 1 1 65 62 5 1
  1336614665: 5 2 11 72 102 943 9 7
  351364: 5 88 4 5 932
  306429: 54 242 8 8 42 3
  496581763: 926 71 9 944 8
  1004: 28 35 24
  729266593: 717 5 117 664 71 121
  57422: 543 15 16 18 7
  27069: 471 5 36 60 256 2
  140711341: 3 5 2 6 641 6 7 560 7 2 2
  47640974: 753 1 7 632 81 6
  22341061: 3 6 62 49 1 62 3 96 59
  111725316757: 8 50 32 88 92 3 694 85
  683490481804: 2 729 10 2 9 3 5 97 931
  694400: 5 8 42 8 3 3 222 6 8 7 16
  684786: 2 3 661 750 33
  26925082664: 597 451 40 342 664
  444150: 84 8 15 92 26 45
  675949120: 65 6 28 600 5 3 8 55 7 7
  151616887: 252 631 2 635 1 6 4 61
  4813038385: 8 3 486 6 12 2 9 381 1
  90386: 11 504 4 384 89
  4324782: 3 99 1 933 3 14 5 5 34 3
  1610070872006: 88 8 56 906 3 73 25 8 6
  61335: 9 99 7 1 4 68
  69422101008: 2 119 4 439 8 819 1 6 5
  1755533171: 637 448 6 3 459
  9464832: 574 58 39 8 48
  561077: 401 2 3 942 312 338
  498378: 41 8 52 31 75
  14072856: 82 3 9 40 65 6 76 4 4 4 6
  23920344397: 3 2 19 11 17 74 73 468
  4236348: 674 1 9 752 3 6 982
  34943027544: 8 30 1 421 27 544
  956229692: 2 665 6 346 204 46 89
  1291680: 4 15 598 9 4
  17406915: 29 6 1 2 4 6 484 4 9 1 9 6
  12804488: 34 3 3 45 1 76 8 4 5 3 8
  738024908: 7 8 5 1 5 8 15 828 5 6 71
  33610025552: 231 7 9 5 3 7 3 9 82 6 4 9
  184299: 2 9 8 94 975 2 7 1 6 4 3 1
  61568: 19 697 77 743 3 5 2 4 8
  8323590: 307 8 4 18 58 1 9 43 3 8
  31643: 4 520 7
  735: 5 147 1
  7734: 23 315 9 477 1
  25965018: 404 46 577 1 8
  381726414323: 1 377 9 7 55 5 3 8 9 7 2 5
  7198253075: 232 201 709 3 31
  67016589: 9 8 9 8 4 9 3 3 1 82 584 5
  93649: 153 6 9 91 855
  2121312276: 3 3 2 7 8 16 9 8 7 1 227
  1004: 38 62 799 97 8
  8288281798: 164 7 6 483 17 96
  75116813: 2 5 511 68 11
  112283: 27 8 8 40 16 5
  123687502: 46 33 9 9 9 502
  6287743044: 9 2 6 8 9 594 5 2 2 75 36
  914528962: 8 278 9 62 567 6 6 1 5 9
  26697895485: 169 29 4 256 7 84 2 66
  118181: 193 306 1 10 6 9 2 6 7
  4860404640: 221 750 520 464 9 7
  221863: 7 309 94 7 6
  34759: 6 5 49 6 5 365 44
  125066: 842 5 905 71 585 89
  75690824: 189 4 90 821
  777498: 37 57 5 7 6 638 9 606
  5365990302: 619 8 8 50 1 7 1 3 43 3 6
  89137440000: 93 6 9 6 6 67 7 8 3 7 75 4
  36190: 6 97 452 5 7
  97895519: 5 16 462 130 825 1 1 8
  6579: 55 51 6 6 1 7 6 920 703
  19: 9 2 1
  82236: 822 2 7 6
  458700698113: 764 492 9 6 98 107 4
  259798729602: 3 4 9 6 1 49 3 4 50 422 4
  432085: 9 60 8 8 3
  36186: 49 22 505 1 210 63 55
  433240464: 65 6 9 2 18 89 7 197 34
  1940: 1 9 38
  403135: 56 6 879 2 331 54 254
  578901186: 7 2 11 7 1 5 6 3 529 6 4
  4873227439: 115 25 332 411 439
  4244991173: 9 6 2 979 5 7 8 7 4 1 6 8
  244041445017450: 8 1 3 47 1 483 39 3 451
  7334: 848 531 5 65 6 368
  1031568: 1 9 3 148 8 5
  39537375: 73 2 453 524 6
  1799: 960 1 1 61 6 751 6 5 6 4
  19683930422: 3 20 3 44 194 466 17
  2992968: 150 4 68 1 682 80 6 8 9
  143489508: 851 98 56 27 6 60 48
  1633086: 595 3 2 7 39
  4102: 5 565 3 903 371
  132039052: 44 6 10 7 803 5 28 9
  219373058: 5 2 496 4 796 934 58
  1770060718141: 21 852 6 81 7 4 8 1 3 8
  27300370328021: 4 7 893 9 9 35 4 772 20
  5831145: 33 7 3 4 7 5 3 239 7 5 5 6
  5395959457: 7 8 35 6 2 6 5 9 5 938 7 7
  65113388: 1 4 4 255 3 8 3 7 9 3 7 2
  30758: 90 1 255 89 53
  63936847222: 1 7 7 718 963 1 3 9 53 4
  424436: 95 446 3 636 97
  42036: 7 60 20 13
  941772392: 941 7 723 9 2
  84578: 8 93 2 1 781 5 9 94 72
  127686: 44 402 2 536 7 47 54
  125107379: 8 4 862 31 4 4 8 4 87 92
  13639451: 2 81 8 894 692 13 9 14
  12501969064: 694 3 18 42 3 690 61
  8006402: 272 841 35 82
  134109600: 7 96 8 57 692 5
  133447951: 4 6 1 2 5 2 82 479 35 6 8
  3236693: 7 963 48 10 794 222
  1392: 6 23 9
  2821548757: 1 28 214 1 4 7 996 762
  268648831: 88 2 1 2 6 3 8 41 4 7 2 19
  426215: 6 2 7 6 976 1 3 8 4 420 2
  167947: 4 176 8 890 37 590 1
  631866547412: 9 702 66 54 740 9
  51984865: 8 550 9 77 93 7
  130026: 2 3 7 5 1 5 9 683 3 808 2
  1429: 9 26 8 4 39 456 762
  74596050960: 9 8 6 6 2 8 8 7 4 501 9 62
  15375262058186: 5 322 642 9 1 45 81 88
  10064773: 133 84 94 8 8
  3374281: 9 920 8 4 9 52 75 956 1
  12264: 17 9 4 8 4 9 957 76 339
  1890047: 2 5 315 731 487
  1441460: 8 86 5 21 99 713
  9149992: 9 149 943 44 7
  10214: 3 85 1 32 8 5 2 62 3
  64961897: 6 6 3 6 5 26 7 3 77 5 9 6
  2531533121: 305 83 2 815 496 8
  61290135: 58 1 781 45 132
  47866682: 182 2 423 615 2
  3485393: 3 345 45 8 90
  4981892069: 46 95 3 4 969 95 16
  333529: 2 36 97 527
  863393445: 1 7 578 778 8 1 4 1 5 3 1
  32473449120: 95 1 843 255 6 2 280 4
  12217522351598: 7 53 1 168 9 4 4 7 9 19 5
  9408614: 940 18 9 601 67 4 42
  2589967782: 6 2 6 6 598 656 4 778 1
  209019069622: 8 709 6 766 6 8 4 19
  75814: 2 1 41 916 481 224
  8183473443006: 89 2 6 79 3 69 707 58
  2266968172: 8 31 88 31 169
  59978: 10 40 28 969 8
  2570: 56 45 31 7 12
  1749230422: 860 836 811 3 742
  126071336759: 5 5 9 8 4 6 1 9 7 669 6 9
  25954985: 3 31 993 1 8 7 719 7 74
  10764846: 5 468 46 1 4 834
  76992: 1 9 86 3 9 30 1 6 7 23 1 5
  174302137: 584 9 2 13 149
  205096551780: 590 91 1 956 12 382 5
  753554337: 7 64 4 89 29 5 420 77 3
  1735904: 707 9 1 2 7 7 9 7 6 136
  590570235: 6 984 93 77 237
  75848896: 457 194 107 488 97
  3160356946606: 395 16 713 889 4 2 5 3
  5255049: 7 945 16 23 15 9
  43148557688: 1 867 90 28 1 7 5 33 7 7
  766118: 475 160 8 603 7
  822646826: 550 83 570 24 95 25 1
  46207080: 6 62 38 877 8 37 5 4 6 3
  29405645: 8 1 2 2 4 46 9 4 82 5 237
  3092868591: 39 5 3 261 913 946 4
  2889460045: 22 6 894 5 99 89 54
  693: 8 3 672 1 8
  397281130294: 5 877 5 4 234 781 3 3 4
  745312: 912 7 811 1
  322435163146: 3 223 5 8 515 1 314 3 1
  57393: 4 2 9 82 1 810 1 9 8 7 3 4
  956019806: 19 781 9 537 407 7
  7896459305: 789 645 927 4 31
  13345802: 25 58 63 92 7
  4036163600: 297 949 2 358 40
  262417795428: 877 3 697 53 3 8 7 25 9
  3727: 8 8 4 7 3 2 361 7 7 52 4
  217251: 6 9 2 7 7 1 78 73 1
  62405808392: 7 55 2 391 51 9 7 1 9 1 3
  4816: 4 27 6 3 32 5 7
  262: 215 29 16
  871: 9 777 85
  31355100: 656 9 46 252 5 35
  1107: 9 6 73 23 10
  549255168081: 86 8 16 1 9 9 88 70 78
  588201: 735 8 99 7 81 13
  83476167: 160 1 4 1 6 2 6 7 4 6 8 9
  2830: 210 1 70 2 3
  312766: 1 745 88 85 9 34
  498245: 653 39 8 90 5
  120400: 4 1 57 99 3 57 4 652 43
  181238: 181 18 42 752 6
  8595645176: 3 5 7 2 1 95 627 18 176
  63941249: 1 10 934 831 11 1 341
  222: 8 11 10 1 32
  648782: 879 37 43 973 67 7
  118832: 44 30 15 6 32
  473849: 4 39 77 41 2 7 36
  27720691: 688 4 92 8 5 2 75 5 4 8 3
  6960275411: 527 33 1 92 3 8 852 4
  896629360: 1 49 43 8 227 6
  742: 660 1 15 65 1
  73902349: 4 91 41 6 338
  10983281: 1 7 5 5 8 1 64 330 881
  4204579: 96 2 715 6 60 19
  582461: 939 1 57 146 4 798
  132639366: 172 41 896 695 6
  2349058: 59 4 2 987 1
  60891768227: 9 1 833 659 96 72 225
  304: 291 7 9
  57841: 2 89 13 6 2 2
  3780564840: 605 8 34 7 38 6 54 54 1
  7456: 7 215 61 649 8
  1935: 5 6 82 6 2 4 587
  240128427: 8 322 3 2 9 1 3 4 3 8 31 7
  432062477: 334 98 6 22 80
  4224726446: 238 71 6 5 5 73 3 444
  347487: 3 3 27 65 6
  1881036: 855 11 2 36
  13872472: 25 143 5 4 8 394 69 9
  227170245: 93 868 4 242 5
  1311858450: 889 7 7 4 83 4 7 35 9 2 1
  284211255: 70 302 4 938 754
  78885: 1 770 14 80 149 254
  4970590223: 71 70 590 22 5
  1602907: 78 87 82 45 2 11 96
  13841612: 9 967 7 493 197
  6794281800: 28 24 414 24 81 24 75
  3445: 53 3 4 7 26 2 5 8 27 529
  2153642498: 5 9 271 7 1 12 34 2 8 9 8
  1101127586: 71 284 2 31 7 584
  748: 2 1 82 2 578
  14912132: 590 35 532 704 6
  94380: 71 2 2 6 897 6 79 8
  374: 4 364 1 6
  573343848: 9 2 96 7 7 1 2 3 9 2 76 9
  88452868266: 402 8 764 6 711 6
  16067: 27 790 9 55 3 6 157 52
  36465214: 663 15 8 2 53 326 885
  121966181322: 5 61 28 53 7 2 1 41 2 8
  4837640: 567 7 24 312 34 8 1 3 3
  9556492: 1 4 940 3 6 2 639 1 6 4 4
  50007513650: 22 372 804 76 48 5 1
  43315: 4 5 3 5 5 1 9 2 3 5 28 87
  202771978716206: 5 1 334 67 8 5 7 8 790 9
  79852128: 7 737 43 52 2 6 8
  4147549908: 6 2 81 4 8 8 1 8 2 9 910
  200429752: 7 3 8 4 5 4 8 2 71 420 7 9
  225679: 6 781 48 1 750
  178161139: 99 7 5 6 4 53 514
  536762: 6 487 60 45 4
  38997: 55 6 7 7 9
  5829: 6 854 1 644 60
  25746433854: 2 27 640 578 77 6 4 5
  175809002: 34 4 8 60 7 47 5 66 500
  6980: 687 6 4 4 40
  369920: 41 9 924 40 8
  1624: 4 9 31 9 2 6
  9411309: 5 5 1 22 57 997 962 7 9
  667326108: 453 91 141 15 87
  1004698: 8 20 3 1 60 81 5 12
  36731761: 452 520 961 25 19 5 8
  58424832: 2 4 166 6 1 5 409 4 192
  120: 2 1 7 1 8
  36176974: 9 6 6 829 2 20 727
  107142489: 653 418 423 1 91
  2538: 3 2 80 8 27
  2096316498: 87 3 464 3 24 218 1
  1143187220466: 9 45 7 3 2 96 3 5 5 4 468
  2311353: 5 77 667 7 15 9
  2616546960: 4 6 4 3 7 19 6 8 23 4 180
  467450295: 2 241 46 4 2 8 4 8 6 1 3 6
  9970163: 436 1 3 676 7 5 11 4 9 1
  35850448667: 4 80 7 65 3 8 286 45 4 2
  569902155: 4 9 75 6 79 823 56 445
  117431: 75 52 77 7 4 3
  39762: 8 270 7 9 16 57 15 192
  65228: 104 9 9 61 693
  168936037718: 35 195 80 6 1 286 6
  10846807: 191 3 567 8 88
  107280: 7 81 2 17 280
  1328917: 6 1 3 91 253 58 2
  39225: 8 498 6 886 8
  423272592: 42 3 271 874 716
  12478726: 766 91 416 7 5 2 6 798
  2068614935396: 86 3 799 4 8 9 3 6 5 39 6
  3608786755: 9 513 1 6 8 9 5 4 768 8 4
  214825563: 397 825 1 1 1 2 3 1 9
  1577: 54 3 6 72 6 137
  265199760167: 29 39 4 3 6 632 8 9 1 6 8
  4832712: 6 20 866 9 432
  388203616: 462 14 69 28 3 223
  838702483053: 19 3 776 3 7 8 290 15 3
  8353141: 85 332 74 4 14 3 4
  805660234766: 33 9 3 9 72 8 7 84 471
  49483708029: 39 9 9 3 2 1 3 7 54 3 62
  8892416966: 49 1 9 20 72 413 3 9 66
  6336692: 1 4 2 9 88 519 88 9 73
  45323953: 4 272 8 7 462 4 7 2 3 5 5
  1656480: 22 2 2 4 5 4 7 5 5 238 3 2
  1885042369: 231 85 858 4 3 8
  70734: 70 659 76
  451366: 8 9 9 73 653 6 8 7 1 7 2 5
  393595517955: 9 632 871 35 1 4 511 3
  999: 9 8 6 6 7
  336677287334067: 879 99 977 66 23 4 5 6
  760635: 4 3 60 245 391
  130284: 8 2 83 658 2
  2404653: 528 897 979 64 5 8
  681300892: 71 94 9 656 561 5 7 6 4
  1604729427: 73 86 408 369 8 3 84 8
  6976026652: 5 811 2 35 3 1 45 4 85 2
  15162053: 1 153 6 2 95 380 50
  1787623976242: 798 473 3 8 6 95 592
  66792649: 1 78 934 66 588 60
  8106810: 255 8 2 1 3 4 9 9 6 8 93
  785870580: 3 745 37 870 5 80
  585080: 68 717 2 6 8
  6453586: 383 337 6 5 8
  37391642512: 4 245 2 776 3 450 52 5
  621878912: 5 4 727 3 6 8 1 915
  33622021: 7 85 7 79 89 36 27 522
  18663545806077: 896 165 649 234 89
  7478552: 1 73 88 90 289 264
  193124594589: 965 62 297 296 2
  851168884: 2 16 8 5 9 71 4 4 3 1 884
  201303846: 38 293 1 49 2 8 2 1 94 9
  19384474050: 6 3 8 2 53 3 447 40 47 6
  101416182: 4 1 7 6 712 8 546 5 4 76
  1389457: 52 668 40 1 16
  62222885: 59 9 22 9 2 68 5 55 85
  157550163508: 6 95 2 3 274 163 505
  1194: 74 824 72 1 223 3
  47245667: 4 15 325 5 36 5 3 76 42
  14656583414: 1 3 1 65 583 75 25 9 11
  100928239: 6 46 957 28 23 8
  28737516: 5 19 5 278 7 4 2 5 1 5 9
  319611572280: 5 39 9 585 6 307 749
  1087345979: 10 7 8 5 80 8 43 2 977
  5670810053865: 9 601 7 4 5 99 9 947
  4785796947: 4 6 4 9 8 21 8 6 618 1 8 4
  5583960: 926 5 950 5 34 55 1 8
  6593: 1 5 8 5 97 8 7 2 257 1 13
  557119332: 363 121 14 906 1
  115695268: 964 12 788 738 5
  148681847648411: 743 4 5 461 9 121 4 13
  598955: 2 32 47 319 953 2
  5322245312: 66 96 84 530 9
  11637274559: 2 8 4 9 9 9 381 787 146
  24562136: 537 8 6 50 571
  26208: 246 320 5 82 9
  105736523: 71 7 2 9 2 64 7 88 1 641
  44037634342: 6 1 1 9 2 708 1 1 1 4 341
  26535: 7 39 538 878 912
  3815734: 381 57 27 7
  6998128: 699 41 2 398 3 28
  643469713261: 233 3 84 9 5 4 6 493 6 3
  1153089117: 28 91 67 184 2 5 393
  87211006: 25 114 34 75 33 9 25 9
  28171737697: 4 4 9 7 98 7 9 1 3 99 697
  1394607205: 5 6 841 628 1 7 5 2 16 4
  3404811221: 3 399 5 811 224
  3849330: 3 3 3 6 9 296 7 92 8 4 8
  617623508: 2 56 3 762 351 1
  14853187: 674 146 671 328 22
  1454: 3 9 3 487 90 50 797
  8962405: 448 2 188 1 525
  259572: 706 367 74 362 34
  2779245985: 3 441 45 3 7 986
  296: 9 9 151 1 63
  55496: 1 10 544 9 5
  144484: 304 471 9 790 498 3
  41910660: 51 83 37 3 99
  52391086: 9 688 8 846 1
  2689350: 6 297 3 6 3 493 2 8 7 8 6
  115312: 11 5 3 1 4
  124: 2 52 1 7 2
  1619708377122: 74 435 8 8 4 8 84 68 1
  1012786558572: 5 316 6 78 36 7 3 6 7 7 3
  18705: 59 4 8 222 63 3 8
  5427163016: 859 9 90 78 10 18
  130598: 53 67 47 782 4
  5303900187: 8 52 456 699 40 27
  548152: 6 4 802 25 3 1 3 3 9 3 7 9
  5703654827: 97 9 1 97 913 8 6
  941392235: 67 8 6 9 2 129 5 7 7 5 6 6
  17002440: 5 1 9 1 4 4 7 5 7 9 52 30
  1832216: 192 679 503 2 7 21
  10092595635: 96 1 7 1 7 1 3 207 1 5 8 7
  93223: 93 831 3 31 2 8 470 1
  104178948: 6 868 9 474 2
  60571: 60 4 73 4 94
  16135488: 21 409 6 9 8 514
  61341829: 69 889 74 8 6
  222710400: 9 1 76 74 8 495
  97147: 7 7 96 286 5 45 172
  9371290: 1 10 860 914 985
  510996: 29 27 5 768 421 5 93
  95890474420: 95 88 9 5 9 7 39 45 476
  1584: 111 70 27 602 98 676
  69285328043: 69 2 1 8 526 6 80 34 2 7
  77406525462: 48 378 6 8 38 26 1 31 2
  53638: 8 638 83 4 5 8 3
  89682: 3 96 90 2 583
  38950: 1 2 67 48 56 6 6 1 6 9
  147192243: 696 35 162 10 6 245
  5875749569: 8 9 30 2 6 91 574 9 571
  86094936075: 6 94 3 140 124 76
  831: 5 1 89 729 9
  209738679: 98 2 5 198 183 2 6 680
  622617586: 108 6 6 3 1 57 7 8 9 796
  36002: 49 19 57 72 4 2
  70185240486: 618 4 80 61 507 7
  133062: 97 35 858 9 197
  673138: 5 4 3 9 763 7 6 29 143 1
  5354409: 9 6 47 555 322
  21: 7 6 9
  2985: 496 90 8 3 5
  134744: 49 83 8 9 9 5 53 82 9
  21136: 9 56 4 40 40 2 1 9 764
  34359: 5 4 23 6 72 807
  590700448: 587 26 82 472
  4656: 236 55 8 2
  2091397218: 433 483 71 39 68 8
  30253359: 35 3 7 75 9 33 2 5 2 5 57
  368680312: 367 7 73 907 315
  27669457: 27 603 66 457
  1909598: 57 5 67 72 29
  363584496: 9 5 42 226 37 503 6 4
  1695: 8 2 25 70
  75459782: 78 297 2 4 5 9 780
  396365711: 22 67 445 31 5 709
  4227: 6 694 47 1 16
  193414: 42 98 45 4
  178472020519: 6 297 5 8 85 102 2 69
  2356070: 1 271 2 34 858
  297355331: 887 5 1 335 44 4 489 4
  275421342: 5 918 3 1 550 7 6 1
  3931: 2 7 924 79 9 3 851 2
  844164: 991 1 4 50 27 1 786
  41294252: 4 12 942 20 4 30
  251642899052: 54 75 2 589 6 766 6
  18494: 3 4 6 4 6 6 1 5 2 77 717
  4448239240: 8 4 8 6 3 524 3 237
  1303: 58 1 732 4 5 3 2 83 415
  39780279: 9 68 7 2 68 94 3
  55590: 17 8 8 2 51
  6708163529: 670 81 541 79 1 15 29
  1430317: 6 1 86 92 4 14 89 1 57 2
  369: 4 87 13 2 6
  188043537614: 967 8 2 4 6 6 633 80 3 9
  1043: 37 59 46 7 7
  1058627808: 2 8 75 440 8 92 7 3 25 9
  2258503303: 43 9 1 257 764 641 9 2
  4321966143: 432 196 5 911 232
  378672480215: 7 9 5 5 6 1 3 8 96 5 2 16
  61080272022: 1 191 460 79 88 22
  306296408: 2 6 51 55 4 1 9 1 3 78 5
  379989863177: 654 9 634 7 69 904
  46216845635: 649 104 9 712 34
  963: 42 95 1 7 4
  366029: 4 54 2 50 199 440 589
  352032: 7 7 1 179 2 2 3 6 5 7 813
  5312011266: 40 8 22 6 40 1 7 4 1 53 5
  4022967: 5 7 4 782 49 70
  28435262: 2 8 1 4 4 7 7 8 3 442 84 1
  1694589: 429 957 26 1 6 12
  20192882: 1 81 916 37 68 3
  5585510298369: 70 644 852 47 9 29 32
  449126029511: 590 170 8 751 761
  2685843: 58 9 3 667 6 5 26 2 43
  1061506: 39 31 5 3 9
  291029855: 5 1 485 247 51 5 8
  20727882975: 4 473 7 662 978
  55904160038049: 467 8 55 869 1 32 679
  4015421905: 4 187 202 3 25 70 70 6
  479990: 2 101 44 54 38
  210045090: 694 3 5 45 8 275 5 1 73
  19759927905: 1 6 343 8 4 9 9 15 7 90 2
  67111: 49 81 33 1 782 8 14 9
  441928: 6 3 1 33 7
  11171760: 75 3 432 9 94 9 9 963
  4991508: 10 843 74 1 8 757 183
  425042235: 420 4 56 221 10 1 81
  62161: 538 71 30 4 239 991
  2725764: 42 6 10 3 8 75 45 789
  11173464936742: 6 8 9 7 2 1 6 9 312 2 48 3
  11978613: 934 3 272 47 5
  594683457: 88 506 14 54 345 4
  660: 83 498 76
  490497802406: 70 7 497 802 409
  5440724: 7 1 4 9 160 317 9 3 75
  19985: 3 79 2 9 784 10 422 2 1
  102695426: 999 53 10 967 24
  151408: 70 4 28 2 280 4 36 5
  2712720: 98 8 996 508 3
  122880: 50 38 8 6 6 64
  6229710: 4 7 2 788 2 959 8 37 1 9
  19658825: 57 2 34 98 23
  28160630: 4 273 3 32 9 8 5 2 6 2 7 5
  591140433: 67 63 62 874 44
  60896: 5 12 1 889 8
  94197: 1 93 415 782 1
  62: 5 1 17 9 30
  7622540: 8 84 158 458 5 2 254
  140652520: 5 5 8 7 6 58 5 7 3 1 81 41
  983263: 422 585 9 769 63
  32107: 3 8 3 953 11 180 467
  2122597: 212 2 27 5 9 313
  3600598: 5 5 36 150 4
  839022336: 531 205 142 892 9
  7853: 7 4 23 7 22
  74556: 21 355 5
  6519534705375: 3 4 40 848 8 21 652 88
  596866566: 6 7 8 9 6 1 5 489 1 4 5 34
  4194599: 4 9 9 1 6 8 69 9 9 9 2 689
  186052032: 4 211 338 9 96
  491053582121: 914 3 7 765 821 18
  259: 3 29 5 7
  148635877: 29 5 41 435 25
  7357400: 884 208 7 56 40
  1247536694: 1 3 5 374 9 1 460 33 8 9
  5242752494530: 97 9 79 20 824 14 6 45
  33841: 79 7 5 226 7 6 908 5
  1017708422: 234 49 7 86 8 258 62
  17063: 6 64 322 4 77 1 60 1
  2458291: 245 823 6 1
  1858104: 671 460 2 974 41 7 6
  3981306130: 8 250 8 8 2 6 5 9 6 3 4 31
  33108: 869 3 37 847 1
  324328158: 990 13 2 33 126
  150610: 3 86 4 3 8 2 74 1 7 5 903
  59551331753: 4 248 52 2 6 3 8 749 4
  11392: 1 21 5 6 509 3
  35886972295: 260 8 9 382 1 3 639
  1195518239: 355 807 3 6 16 70
  390263415: 58 81 79 3 84
  43719425980686: 67 677 130 646 688
  38806776535: 808 465 8 6 9 8 538
  11108160581: 81 147 12 812 116 5
  62188: 79 1 777 8 20
  4328338: 8 541 338
  767871302: 1 45 7 91 594 471 959
  48307625: 96 6 5 762 7
  25845765120: 18 5 898 609 768 60
  4920993: 6 69 89 30 990
  2009844728: 9 8 2 3 600 57 5 5 4 6 3 5
  16262: 8 8 327 3 526 40
  102649613987: 9 1 7 1 8 2 746 10 7 48 8
  62832: 7 8 3 1 40 25 35
  546770312: 69 3 1 3 8 2 3 5 3 871 6 1
  995210: 4 6 88 4 13
  27764: 96 63 43 9 38 57 4
  6596051: 659 5 826 76 151
  1696: 4 4 96
  76387474: 29 3 878 885 589
  887958: 265 9 62 7 1 6 76 620
  239447: 604 98 37 3 9 4 2 3 5
  5171959300066: 3 48 406 194 57 5 8 67
  1798335: 3 39 7 69 3 845 99 3 5
  665214448: 665 202 4 8 447
  7050: 6 2 2 89 560
  5828: 3 3 2 656 36 2 3 3 8 4 92
  49296672: 77 64 6 1 9 6 73
  448659113757: 594 219 5 363 416
  28490582: 74 964 38 426 3
  908714: 80 10 248 623 1
  441207837: 459 5 9 15 96
  3122771: 389 4 8 38 7 86 2
  4664: 7 4 748 6 9
  14799610652: 881 139 646 26 8
  79002161: 9 1 17 7 5 956 9 3 8 6 9
  24535779: 385 3 7 7 5 9 6 70 3 4
  774464: 2 3 8 6 39 9 53 5 8 656
  86843: 315 3 350 130 3
  7373481: 1 78 6 62 69
  821633561721: 5 25 2 4 1 8 977 2 9 722
  42373933703: 5 9 7 2 8 741 7 4 2 1 1 92
  14065359: 3 50 4 25 57 12 52 3
  615099: 4 27 2 3 9 1 8
  4561880: 569 8 4 35 8
  1274: 418 551 1 2 264 38
  1526839: 9 3 70 193 733
  779652: 326 1 8 985 5 1 4 5 9 6 9
  595317104: 92 59 61 6 7 2 6 6 6 76 4
  2523150: 38 7 30 89 21
  13263: 3 62 2 70 6 97
  3728386: 9 47 4 1 62 1 1 43 65 22
  3432857: 8 429 8 5 9
  476343664267: 42 31 836 48 57 9 94 6
  255870: 90 9 9 642 29
  4900956092109: 699 8 3 36 5 4 4 458 7 7
  818241: 358 72 25 19 769
  555645818638: 5 90 8 58 5 81 85 4 7 91
  95396: 5 6 8 190 199 3 2 8 9 7 6
  809185020: 1 734 98 41 274
  194875: 3 121 534 54 980
  3564788: 5 94 126 1 6 30
  9241712: 2 7 225 53 86 10 8 74
  5769566: 2 8 6 6 77 4 75 107 6 1
  11480278754: 68 2 164 27 86 85 67
  55692: 4 98 7 6 13
  216953: 18 12 955
  307145445609: 78 313 474 53 7 74 64
  446713: 2 84 716 557
  1629146995: 264 4 4 2 1 2 3 7 5 8 44
  25569836: 8 1 7 8 3 4 47 9 736 3 5 9
  6437873153: 5 6 4 594 2 6 9 664 8 8 1
  719037270: 28 3 9 7 8 51 69 695
  49498478570: 6 1 4 525 95 898 2 84 1
  26544258088721: 408 373 2 65 7 1 87 2 2
  651847677: 145 175 88 9 643 4
  2130440: 8 3 11 41 250 3 680
  6372: 69 57 5 7 1
  42364964: 62 948 537 770 78 44
  236043: 686 49 5 89 7 86
  93309627778: 43 1 1 989 24 9 3 77 7
  18465: 251 69 966 4 4 12 160
  20058194459: 9 97 25 6 9 3 9 35 3 9 3 9
  22540578: 9 709 7 46 9 3 4 28 2 1 6
  76804489172: 8 960 3 6 8 8 9 16 8 5 1
  37315111728: 84 15 4 649 248 1 46
  2099244933: 33 3 4 394 3 4 904 1 31
  5788323: 23 54 5 69 7 21
  28236624: 86 61 6 7 2 16 2 1 4 6 8
  1313564365: 84 3 159 18 98
  757: 8 91 29
  11800: 1 1 802
  452490301161: 878 62 1 944 515
  2990297456: 7 3 59 8 5 2 9 74 1 53
  66006075241: 3 4 64 5 5 20 92 2 7 5 7 3
  71271389: 5 277 7 2 3 7 4 75 7 1 9 5
  24291: 32 4 11 72 77 96
  86163645: 8 97 53 8 96
  8392581117: 88 61 76 786 939 66
  373836672: 1 3 9 4 409 8 848 792
  1417505625: 6 31 687 6 374
  6470100: 3 72 6 4 9 1 553
  270: 7 6 4 2 5
  1432399648684: 8 8 89 7 231 93 520 9 2
  7114565: 7 3 3 46 97
  1580299: 7 52 7 1 744 8 177 45
  99294: 7 4 8 2 6 8 90 7
  110: 8 6 1 48 10
  6450588963334: 82 284 99 783 6 333 1
  15008: 27 3 53 3 383 32
  5704417: 67 92 59 608 699 70
  66464462: 5 5 2 2 59 3 5 74 2 2 9 1
  426712: 74 220 71 1 61 26
  803: 91 307 385 4 16
  102173848: 6 9 5 6 940 7 3 827 24
  1638256836: 409 1 4 63 5 5 4 2 2 2 3 6
  4428018648: 204 1 216 185 62 85
  2228269601: 91 171 45 8 8 90 904 3
  277540661734: 3 98 32 5 79 59 734
  12670: 872 20 375 1
  1216423: 47 527 56 7 7
  502212: 68 50 25 73 337
  1730465056: 986 587 15 110 59
  638559: 2 50 329 4 419
  136631196394: 3 2 8 7 6 6 54 913 2 753
  84170763: 2 2 425 2 30 7 9
  13421696: 83 89 52 159 44 8 55 3
  808201: 23 488 1 8 9
  88960833: 414 9 623 21 4
  1217735408: 826 63 8 5 6 7 234 99 8
  671300261: 9 5 9 14 50 259
  44644370: 330 555 8 56 9 4 6 7 1 1
  7517938: 3 6 2 4 20 58 4 5 54 57 1
  132: 30 3 3 19 5 9
  333479: 1 3 201 387 280
  12096715360: 1 6 126 6 71 535 9
  3585279167: 71 61 9 5 432 4 5 1 6 3 7
  57353: 16 468 79 7 95 3 3
  1275887: 8 337 77 8 92 34 6 5 6
  1262728: 3 3 4 9 1 1 514 44 2 2 1 8
  1073500: 566 59 6 286 16 978 6
  13086888523: 81 3 69 9 6 221 99 45
  7232: 15 318 2 3 54 2
  10945041: 986 111 9 35 3
  63462422: 9 402 70 67 22
  387968229: 63 92 74 6 822 5 3
  39655: 159 3 971 7 5
  4811134: 1 6 60 748 96
  4882688: 8 480 268 5
  7286: 3 2 291 5 11
  40082445503: 8 275 702 69 27 476
  15464: 4 550 9 7 1
  10750553322: 413 48 282 26 2
  1569941232997: 941 60 23 8 8 25 40 49
  7408: 6 9 4 5 5 6 8 914 8 16 50
  54432: 407 1 97 6 18
  1474838566: 73 741 920 8 2 7
  7170164160: 841 214 4 996 2
  509285509: 427 3 4 405 97 731 2
  284618201: 5 431 310 6 407 1 71 4
  9728716074: 6 869 8 2 398 3 7 582
  564880555: 3 87 923 68 45 54
  598: 6 5 2 4 9 8 6 95 245 1
  586932: 58 6 592 324 6 9
  2193899545: 98 87 71 6 208 1 604 9
  2836770: 830 261 26 1 70
  394334517187: 5 6 5 5 13 4 8 764 23
  10765: 492 6 2 767 79 8
  167839818: 4 2 815 1 46 746 258 4
  201714977: 14 408 2 317 1 7 758
  142: 32 5 35 4 66
  140659203186: 72 370 66 8 30 93 92
  3787386567: 5 188 5 1 73 2 559 8
  5352640: 3 16 3 950 8 3 1 688
  23236875956: 2 9 34 5 45 5 85 6 9 9 59
  7786061171: 4 1 3 5 8 9 4 9 6 6 423 87
  2361736314: 1 36 9 28 831 49 7 17
  10066686244863: 8 7 8 6 3 7 3 672 834 66
  15643152: 9 9 366 57 56 6
  1478892934: 53 9 642 2 3 7 7 293 7 1
  9366820: 9 349 1 7 8 2 816 4
  206191: 694 2 982 87 1
  22831500: 5 925 982 5 5
  17122508: 364 1 6 5 3 9 1 6 1 52 59
  11308680: 1 4 24 37 4 4 1 566 5 6 9
  11784: 974 12 96
  752177: 4 9 3 21 1 9 9 996 3 7 9 9
  478615: 478 315 242 2 56
  1805023: 8 2 2 2 488 481 1 2 3 92
  198940: 6 631 3 7
  5763734: 960 612 6 49 11
  67926: 9 51 7 164 765
  766583: 3 754 9 5 85
  421852: 4 257 9 41
  12361838487: 515 4 2 61 283 6 5
  7901: 21 768 9
  1758: 766 31 22 60 2
  96937597: 91 5 937 594
  2247652915: 47 864 615 5 8 9
  11004556166: 11 267 8 16 2 488 6
  10613252: 149 48 738 1 73
  3854: 6 6 1 60 3 77
  256528: 1 27 4 8 36 6 9 7 8
  60876279: 2 5 78 169 463 75 37
  569727271: 560 9 7 272 72
  35508: 779 22 546 63 7 2
  189229180: 2 3 80 22 24 5 1 78
  28582830: 948 95 658 35 740 9
  9630: 3 5 601 7 2
  1552791240: 973 465 11 8 39
  48506850: 156 7 2 4 758 3 522 5 9
  41769051: 663 70 9 3 5 16
  52058: 97 27 419 3 5 94
  224060: 5 8 56 3 6 25
  25784: 85 609 36 1 799
  21211654: 265 4 58 2 54
  50704: 269 237 1 9 5
  78384: 86 9 94 8 873 9
  33453: 7 34 450 68 56 9
  629445337: 27 79 1 713 295
  37698877440: 302 9 7 172 3 4 960
  2306: 5 3 4 72 2
  1902864298: 779 86 244 4 54 99
  97546534: 6 8 2 1 6 9 9 6 997 4 9 4
  55651121155: 4 7 6 4 7 1 175 7 48 797
  85969834364: 9 513 8 9 9 648 4 57 7 6
  2399485184: 227 1 128 485 165 19
  1600106: 5 137 7 7 4 8 45 968
  1768050938: 5 6 8 2 4 8 5 1 7 77 3 7
  261477770026: 1 162 3 324 46 2 6 7 75
  124551: 46 71 7 65 659
  7360000110: 1 34 266 25 736 110
  3763620: 6 6 617 3 93 26 4 4 4 9 4
  101736: 7 4 9 6 2 5 6 67 6 68 65 6
  1544: 8 9 626 143 8 679
  61814592717: 135 124 393 783 12
  1190233: 4 5 22 986 1 1 27 6 3 8
  878475: 3 3 8 4 1 2 1 1 5 103 4 74
  152674956: 34 2 60 43 84 417
  948935145: 8 259 1 4 7 8 6 9 5 1 63 2
  2590109: 5 834 621 464 75
  1218360: 3 21 55 923 1
  2893245317: 7 201 4 7 680 2 57 6 9
  13734971359: 4 5 77 7 9 123 8 4 9 4 6 6
  150780: 207 9 2 1 91 77 1 86 4
  5125789: 1 284 6 95 3 7 285 901
  13267368: 24 69 95 6 93 15 8 7 1
  436128: 3 817 537 61 664
  52277926: 50 689 734 854 91 9 5
  27736: 6 9 5 47 6
  80388: 5 8 9 695 99
  76368: 5 20 8 30 29 83 7
  39090: 3 29 8 4 7 630 5 5 70 1 4
  9799459400: 48 994 8 24 962 8 4 5
  2835518: 48 59 3 1 4 21
  657763085: 1 9 33 4 8 9 79 70 9 35
  273865679: 7 6 6 9 4 6 199 1 8 990 4
  173337: 9 897 6 19 5 6
  465640352: 6 9 8 9 6 74 5 936 1 6 3
  8355185149214: 83 46 9 1 85 14 9 215
  3273008: 3 827 492 665 8 808
  2154849: 1 41 8 31 437
  38944925: 59 6 4 653 4
  1751852: 3 3 905 8 20 95 28 24
  4381: 36 12 1 54 6
  23017632: 8 27 41 516 307 8
  14593: 220 2 33 2 71
  2571008: 3 949 6 9 5 1 1 57 1 9 1 1
  20887367880: 9 2 9 541 9 1 3 5 7 8 355
  38042064: 36 6 268 96 9
  5647886509: 3 1 6 848 6 9 59 837 3
  13639: 8 2 3 1 32 4 99 7 1 4 397
  20530114: 88 224 4 813 98 5 4 4 4
  320: 4 56 96
  879215047: 4 8 4 2 9 3 8 841 4 198 7
  41374: 1 3 1 57 4 4 5 6 9 8 227
  71557700: 746 9 2 5 1 761 8 6 7 7 4
  13448009: 71 7 8 27 74 12
  265082680: 2 9 1 9 67 3 8 8 6 241 8 4
  79661: 28 3 3 2 314 9 28
  49842363: 17 18 7 29 65
  353560953: 9 549 4 63 37 50
  179089654066: 29 224 813 766 8
  13504695: 2 4 7 523 47 2 1
  207932: 8 8 7 3 890 227
  41953: 89 2 461
  266192390: 26 810 78 12 99
  90301815: 2 88 301 805 8
  58819003770: 5 84 80 655 3 717 51
  85165026225: 6 70 5 8 25 2 262 24 3
  388: 5 85 2 14 2
  `.trim();

require("util").inspect.defaultOptions.depth = null;
console.log(main());
