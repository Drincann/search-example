var longestCommonSubsequence = function (s1, s2) {
    var dp = new Array(s1.length + 1).fill(0).map(function () { return new Array(s2.length + 1).fill(0); });
    for (var i_1 = 1; i_1 <= s1.length; ++i_1) {
        for (var j_1 = 1; j_1 <= s2.length; ++j_1) {
            if (s1[i_1 - 1] === s2[j_1 - 1]) {
                dp[i_1][j_1] = dp[i_1 - 1][j_1 - 1] + 1;
            }
            else {
                dp[i_1][j_1] = Math.max(dp[i_1][j_1 - 1], dp[i_1 - 1][j_1]);
            }
        }
    }
    var res = [];
    var i = s1.length, j = s2.length;
    while (i > 0 && j > 0) {
        if (s1[i - 1] === s2[j - 1]) {
            res.push(i - 1);
            --i;
            --j;
        }
        else if (dp[i][j - 1] > dp[i - 1][j]) {
            --j;
        }
        else {
            --i;
        }
    }
    return res.reverse();
};
var data = Object.getOwnPropertyNames(Array.prototype).map(function (name) { return "Array.prototype.".concat(name); });
// console.log(longestCommonSubsequence('abcde', 'ace')); // [0, 2, 4]
window.onload = function () {
    console.log(data);
    var searchInput = document.querySelector('.search__input input');
    var searchResultList = document.querySelector('.search__dropdown');
    searchInput.addEventListener('keyup', function (e) {
        var searchValue = e.target.value;
        var searchResult = data
            .map(function (compared) { return ({ origin: compared, matched: new Set(longestCommonSubsequence(compared, searchValue)) }); })
            .filter(function (result) { return result.matched.size > 0; }).sort(function (a, b) { return b.matched.size - a.matched.size; });
        searchResultList.innerHTML = '';
        searchResult.forEach(function (result) {
            var ele = document.createElement('div');
            ele.classList.add('search__dropdown-item');
            ele.innerHTML = new Array(result.origin.length).fill(undefined)
                .map(function (_, i) {
                if (result.matched.has(i)) {
                    return "<span class=\"search__dropdown-item--matched\">".concat(result.origin[i], "</span>");
                }
                else {
                    return result.origin[i];
                }
            }).join('');
            searchResultList.appendChild(ele);
        });
    });
};
