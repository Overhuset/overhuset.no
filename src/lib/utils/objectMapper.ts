import type {Company, Constellation, Event} from "$lib/types";

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


