const nameRules = {
    required: (value: string) => !!value || 'Name is required!',
    noWhiteSpaces: (value: string) => value.trim() !== '' || 'Name cannot be only whitespaces!'
}

export { nameRules }