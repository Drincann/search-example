const longestCommonSubsequence = (s1: string, s2: string): number[] => {
  const dp = new Array(s1.length + 1).fill(0).map(() => new Array(s2.length + 1).fill(0));
  for (let i = 1; i <= s1.length; ++i) {
    for (let j = 1; j <= s2.length; ++j) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
      }
    }
  }

  const res: number[] = [];
  let i = s1.length, j = s2.length;
  while (i > 0 && j > 0) {
    if (s1[i - 1] === s2[j - 1]) {
      res.push(i - 1);
      --i;
      --j;
    } else if (dp[i][j - 1] > dp[i - 1][j]) {
      --j;
    } else {
      --i;
    }
  }

  return res.reverse();
}

const data =
  Object.getOwnPropertyNames(Array.prototype).map(
    name => `Array.prototype.${name}`
  );
// console.log(longestCommonSubsequence('abcde', 'ace')); // [0, 2, 4]
window.onload = function () {

  console.log(data);
  const searchInput = document.querySelector('.search__input input') as HTMLInputElement;
  const searchResultList = document.querySelector('.search__dropdown') as HTMLDivElement;

  searchInput.addEventListener('keydown', (e: KeyboardEvent) => {
    const searchValue = (e.target as HTMLInputElement).value;
    const searchResult = data
      .map(compared => ({ origin: compared, matched: new Set(longestCommonSubsequence(compared, searchValue,)) }))
      .filter(result => result.matched.size > 0).sort((a, b) => b.matched.size - a.matched.size);

    searchResultList.innerHTML = '';
    searchResult.forEach(result => {
      const ele = document.createElement('div');
      ele.classList.add('search__dropdown-item');
      ele.innerHTML = new Array(result.origin.length).fill(undefined)
        .map((_, i) => {
          if (result.matched.has(i)) {
            return `<span class="search__dropdown-item--matched">${result.origin[i]}</span>`;
          } else {
            return result.origin[i];
          }
        }).join('');
      searchResultList.appendChild(ele);
    })

  });

}