export const getIsValidUuid = (uuid?: string) => {
    const uuidLength = 36;
    return (uuid && uuid.length === uuidLength);
}