export const initialState = {
    isLoading: 'false',
    isSignedIn: null,
    userId: null,
    battleTag: null,
    topThreeStats: [], // in the form: [{onFire: 20%}]
    bottomThreeStats: [],
    rankings: [], // in the form: [{tank: 2000, dps: 2100, healer: 1900}]
    suggestedRanking: []
}
