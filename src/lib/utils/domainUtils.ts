export const getIsSameDomain = (email1?: string, email2?: string) => {
    if (!email1 || !email2) {
        return false;
    }
    const getEmailDomain = (email: string) => {
        const splitted = email?.split('@') || undefined;
        return splitted ? splitted[1] : splitted;
    }
    return getEmailDomain(email1) === getEmailDomain(email2);
};