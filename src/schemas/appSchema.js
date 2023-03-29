import * as yup from "yup";

export const appSchema = yup.object().shape({
    name: yup.string()
                .matches(/^[\p{Letter}\p{Mark}\s-]+$/giu, "Invalid name")
                .max(20, 'Character limit exceeded')
                .required('Required'),
    age: yup.string()
                .matches(/^[1-9]\d*$/giu, 'Invalid age')
                .max(2, 'You are not that old'),
    discord: yup.string()
                .matches(/^.{3,32}#[0-9]{4}$/giu, 'Invalid discord tag')
                .max(37, 'Character limit exceeded')
                .required('Required'),
    btag: yup.string()
                .matches(/^.{3,32}#[0-9]{4,5}$/giu, 'Invalid battle tag')
                .max(20, 'Character limit exceeded'),
    charName: yup.string()
                .matches(/^[\p{Letter}\p{Mark}\s-]+$/giu, "Invalid character name")
                .max(12, 'Character limit exceeded')
                .required('Required'),
    charServer: yup.string()
                .matches(/^[a-zA-z52\s']+$/giu, "Invalid server name")
                .max(25, 'Character limit exceeded')
                .required('Required'),
    charClass: yup.string().required('Required'),
    charSpec: yup.string().required('Required'),
    charOSpec: yup.string().max(300, 'Character limit exceeded'),
    wclLink: yup.string()
                .matches(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]warcraftlogs+)\.(com)(\/.*)?$/giu, 'Invalid warcraftlogs url')
                .max(75, 'Character limit exceeded')
                .required('Required'),
    raidTimes: yup.string()
                .matches(/^[a-zA-Z0-9\s-]+$/giu, 'Special characters not allowed')
                .max(300, 'Character limit exceeded'),
    vouch: yup.string()
                .max(150, 'Character limit exceeded'),
    historyRaids: yup.string()
                .max(1023, 'Character limit exceeded')
                .required('Required'),
    historyGuilds: yup.string()
                .max(1023, 'Character limit exceeded')
                .required('Required'),
    extraInfo: yup.string()
                .max(1023, 'Character limit exceeded')
});