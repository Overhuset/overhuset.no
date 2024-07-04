import type { AuthUser, Company, Constellation, EmailDomain, Event, UserInvite } from '$lib/types';

export const mapFromDbToEventObject = (event: any) : Event => {
    return {
        id: event.id,
        title: event.title,
        description: event.description,
        location: event.location,
        time: event.time,
        timeEnd: event.time_end,
        createdBy: event.created_by,
        createdAt: event.created_at,
        registration: event.registration,
        published: event.published,
        onlineStreaming: event.online_streaming,
        physicalAttendance: event.physical_attendance,
        externalsAllowed: event.externals_allowed,
        companyId: event.company_id,
        company: event.company,
        fullDay: event.full_day,
        onlineCourse: event.online_course
    };
};

export const mapFromDbToCompanyObject = (company: any): Company => {
    return {
        id: company.id,
        name: company.name,
        nameShort: company.name_short,
        logo: company.logo,
        logoRef: company.logo_ref,
        url: company.url,
        title: company.title,
        ingress: company.ingress,
        description: company.description,
        partner: company.partner,
        active: company.active
    }
};

export const mapFromDbToConstellationObject = (constellation: any): Constellation => {
    return {
        id: constellation.id,
        name: constellation.name,
        description: constellation.description,
        description2: constellation.description2,
        companies: constellation.companies,
        active: constellation.active,
        createdBy: constellation.created_by,
        createdAt: constellation.created_at,
        logo: constellation.logo,
        logoRef: constellation.logo_ref,
        urlRef: constellation.url_ref,
    }
}

export const mapFromDbToEmailDomainObject = (emailDomain: any): EmailDomain => {
    return {
        id: emailDomain.id,
        companyId: emailDomain.company_id,
        domain: emailDomain.domain,
        createdBy: emailDomain.created_by,
        createdAt: emailDomain.created_at,
    }
}

export const mapFromDbToUserInviteObject = (userInvite: any): UserInvite => {
    return {
        id: userInvite.id,
        companyId: userInvite.company_id,
        email: userInvite.email,
        createdBy: userInvite.created_by,
        createdAt: userInvite.createdAt,
    }
}

export const mapFromDbToAuthUserObject = (authUser: any): AuthUser => {
    return {
        id: authUser.id,
        name: authUser.name,
        email: authUser.email,
        image: authUser.image,
        username: authUser.username,
        createdAt: authUser.createdAt,
        admin: authUser.admin,
        companyId: authUser.companyId
    }
}
