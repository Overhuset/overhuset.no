export const overhusetId = "3dac0ec1-150a-4d4f-9d12-4d37e2aae2fd";

export const getIsValidUuid = (uuid?: string) => {
    const uuidLength = 36;
    return (uuid && uuid.length === uuidLength);
}

