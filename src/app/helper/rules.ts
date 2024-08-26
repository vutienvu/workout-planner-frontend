const nameRules = {
    required: (value: string) => !!value || 'Name is required!',
    noWhiteSpaces: (value: string) => value.trim() !== '' || 'Name cannot be only whitespaces!'
}

const numberRules = {
    positiveNumber: (value: number) => value > 0 || 'Value should be higher than 0!'
}

export { nameRules, numberRules }