import { useFormik } from "formik";
import { appSchema } from "../schemas/appSchema";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import classes from '../constants/classes';
import specs from '../constants/specs';

const POST_URL = `https://discord.com/api/webhooks/${process.env.APP_WEBHOOK}`;

const inputError = 'application-input-error';
const inputErrorText = 'application-input-error-text';

const blank = '\u200b';

const AppForm = () => {

    const navigate = useNavigate();

    const onSubmit = (values, actions) => {

        const fields = [
            {"name": "Name", "value": values.name, "inline": true},
            {"name": "Age", "value": values.age, "inline": true},
            {"name": blank, "value": blank, "inline": true},
            {"name": "Discord", "value": values.discord, "inline": true},
            {"name": "Btag", "value": values.btag, "inline": true},
            {"name": blank, "value": blank, "inline": true},
            {"name": "Character", "value": values.charName, "inline": true},
            {"name": "Server", "value": values.charServer, "inline": true},
            {"name": blank, "value": blank, "inline": true},
            {"name": "Class", "value": values.charClass, "inline": true},
            {"name": "Spec", "value": values.charSpec, "inline": true},
            {"name": blank, "value": blank, "inline": true},
            {"name": "Off Specs", "value": values.charOSpec, "inline": false},
            {"name": "Warcraft Logs", "value": values.wclLink, "inline": false},
            {"name": "Raid Times", "value": values.raidTimes, "inline": false},
            {"name": "Vouch", "value": values.vouch, "inline": false},
            {"name": "Raid History", "value": values.historyRaids, "inline": false},
            {"name": "Guild History", "value": values.historyGuilds, "inline": false},
            {"name": "Misc", "value": values.extraInfo, "inline": false},
        ];

        axios.post(POST_URL, {
            headers: {
                "content-type": "application/json"
            },
            payload_json: JSON.stringify({
                "avatar_url": "https://i.imgur.com/DiHfi2e.png",
                "thread_name": `${values.name} - ${values.charSpec} ${values.charClass}`,
                "embeds": [
                  {
                    "title": `${values.charName} - ${values.charSpec} ${values.charClass}`,
                    "color": 15258703,
                    "fields": fields,
                    "thumbnail": {
                        "url": "https://i.imgur.com/DiHfi2e.png"
                    },      
                    "footer": {
                      "text": "Powered by Shoes",
                      "icon_url": "https://i.imgur.com/DiHfi2e.png"
                    }
                  }
                ]
              })
        }).then(res => {
            actions.resetForm();
            navigate('/applysuccess');
        }).catch(err => {
            alert('There was an issue submitting your application. Please try again later.')
            actions.setSubmitting(false);
        })        
    };

    const { values, errors, touched, isSubmitting, isValid, dirty, submitCount, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            name: "",
            age: "",
            discord: "",
            btag: "",
            charName: "",
            charServer: "",
            charClass: "",
            charSpec: "",
            charOSpec: "",
            raidTimes: "",
            historyGuilds: "",
            historyRaids: "",
            wclLink: "",
            vouch: "",
            extraInfo: ""
        },
        validationSchema: appSchema,
        onSubmit
    });

    return (
        <div className="application-form-container">
            <div className='application-form-container-header'>
                <h1 className='application-form-container-header-label'>Stay Mad Application</h1>
                <p className='application-form-container-header-info'> Before submitting an application please check our 
                    <Link to='/about'> about </Link> 
                    section to get
                    some general guild information. We always consider applications from
                    skilled players regardless of the listed recruitment needs on the home
                    page.
                </p>
            </div>
            <form onSubmit={handleSubmit} autoComplete="off">
                
                <div className="application-form-section">
                    <h2 className="application-form-section-header">Your Info</h2>

                    <div className='application-form-section-questions'>
                        <div className='application-form-question'>
                            <label htmlFor="name">Name</label>
                            <input
                                value={values.name}
                                onChange={handleChange}
                                id="name"
                                type="text"
                                placeholder="What you prefer to be called"
                                onBlur={handleBlur}
                                className={errors.name && touched.name ? inputError : ''} />
                            {errors.name && touched.name && <p className={inputErrorText}>{errors.name}</p>}
                        </div>  

                        <div className='application-form-question'>
                            <label htmlFor='age'>Age</label>
                            <input
                                value={values.age}
                                onChange={handleChange}
                                id='age'
                                type='text'
                                placeholder=''
                                onBlur={handleBlur}
                                className={errors.age && touched.age ? inputError : ''} />
                            {errors.age && touched.age && <p className={inputErrorText}>{errors.age}</p>}
                        </div>

                        <div className='application-form-question'>
                            <label htmlFor='discord'>Discord</label>
                            <input 
                                value={values.discord}
                                onChange={handleChange}
                                id='discord'
                                type='text'
                                placeholder='Discord tag'
                                onBlur={handleBlur}
                                className={errors.discord && touched.discord ? inputError : ''} />
                            {errors.discord && touched.discord && <p className={inputErrorText}>{errors.discord}</p>}
                        </div>

                        <div className='application-form-question'>
                            <label htmlFor='btag'>Battle Tag</label>
                            <input 
                                value={values.btag}
                                onChange={handleChange}
                                id='btag'
                                type='text'
                                placeholder='Battle tag'
                                onBlur={handleBlur}
                                className={errors.btag && touched.btag ? inputError : ''} />
                            {errors.btag && touched.btag && <p className={inputErrorText}>{errors.btag}</p>}
                        </div>
                    </div>
                </div>

                <div className="application-form-section">
                    <h2 className="application-form-section-header">Character Info</h2>

                    <div className='application-form-section-questions'>
                        <div className='application-form-question'>
                            <label htmlFor="charName">Character</label>
                            <input
                                value={values.charName}
                                onChange={handleChange}
                                id="charName"
                                type="text"
                                placeholder="Exact character name"
                                onBlur={handleBlur}
                                className={errors.charName && touched.charName ? inputError : ''} />
                            {errors.charName && touched.charName && <p className={inputErrorText}>{errors.charName}</p>}
                        </div>

                        <div className='application-form-question'>
                            <label htmlFor="charServer">Server</label>
                            <input
                                value={values.charServer}
                                onChange={handleChange}
                                id="charServer"
                                type="text"
                                placeholder="Server name"
                                onBlur={handleBlur}
                                className={errors.charServer && touched.charServer ? inputError : ''} />
                            {errors.charServer && touched.charServer && <p className={inputErrorText}>{errors.charServer}</p>}
                        </div>

                        <div className='application-form-question'>
                            <label htmlFor='charClass'>Class</label>
                            <select 
                                id='charClass' 
                                value={values.charClass}
                                onChange={handleChange}
                                onBlur={handleBlur} 
                                className={errors.charClass && touched.charClass ? inputError : ''}>
                                <option value='' disabled hidden></option>
                                {classes?.map(( {id, value }, index) => (
                                    <option
                                        key={index}
                                        value={value} >
                                    {value}
                                    </option>
                                ))}
                            </select>
                            {errors.charClass && touched.charClass && <p className={inputErrorText}>{errors.charClass}</p>}
                        </div>

                        <div className='application-form-question'>
                            <label htmlFor='charSpec'>Spec</label>
                            {
                                (!values.charClass)
                                ? <select disabled></select>
                                : <select 
                                    id='charSpec' 
                                    value={values.charSpec}
                                    onChange={handleChange}
                                    onBlur={handleBlur} 
                                    className={errors.charSpec && touched.charSpec ? inputError : ''}>
                                    <option value='' disabled hidden></option>
                                    {specs?.filter((spec) => spec.id === values.charClass).map(( {id, value }, index) => (
                                        <option
                                            key={index}
                                            value={value} >
                                        {value}
                                        </option>
                                    ))}
                                </select>                       
                            }
                            {errors.charSpec && touched.charSpec && <p className={inputErrorText}>{errors.charSpec}</p>}
                        </div>

                        <div className='application-form-question wide-span'>
                            <label htmlFor="charOSpec">Off Specs</label>
                            <input
                                value={values.charOSpec}
                                onChange={handleChange}
                                id="charOSpec"
                                type="text"
                                placeholder="Off specs or relevant alts"
                                onBlur={handleBlur}
                                className={errors.charOSpec && touched.charOSpec ? inputError : ''} />
                            {errors.charOSpec && touched.charOSpec && <p className={inputErrorText}>{errors.charOSpec}</p>}
                        </div>

                        <div className='application-form-question wide-span'>
                            <label htmlFor="wclLink">Warcraft Logs</label>
                            <input
                                value={values.wclLink}
                                onChange={handleChange}
                                id="wclLink"
                                type="text"
                                placeholder="Link to WCL page"
                                onBlur={handleBlur}
                                className={errors.wclLink && touched.wclLink ? inputError : ''} />
                            {errors.wclLink && touched.wclLink && <p className={inputErrorText}>{errors.wclLink}</p>}
                        </div>
                    </div>
                </div>

                <div className="application-form-section">
                    <h2 className="application-form-section-header">Guild</h2>

                    <div className='application-form-section-questions'>
                        
                        <div className='application-form-question wide-span tall-span'>
                            <label 
                                htmlFor="raidTimes">
                                    Raid times can be found <Link to='/'>here</Link>.
                                    <br />
                                    Please list any potential issues &#40;if any&#41;.
                            </label>
                            <textarea
                                value={values.raidTimes}
                                onChange={handleChange}
                                id="raidTimes"
                                type="text"
                                placeholder="ex: Late on Tuesdays"
                                onBlur={handleBlur}
                                className={errors.raidTimes && touched.raidTimes ? inputError : ''} />
                            {errors.raidTimes && touched.raidTimes && <p className={inputErrorText}>{errors.raidTimes}</p>}
                        </div>   

                        <div className='application-form-question wide-span'>
                            <label htmlFor="vouch">Are there any current guild members that could recommend you?</label>
                            <input
                                value={values.vouch}
                                onChange={handleChange}
                                id="vouch"
                                type="text"
                                placeholder="ex: Yeah Jimmy is my guy. He can tell you about my juice."
                                onBlur={handleBlur}
                                className={errors.vouch && touched.vouch ? inputError : ''} />
                            {errors.vouch && touched.vouch && <p className={inputErrorText}>{errors.vouch}</p>}
                        </div>   

                    </div>
                </div>

                <div className="application-form-section">
                    <h2 className="application-form-section-header">History</h2>

                    <div className='application-form-section-questions'>
                        
                        <div className='application-form-question wide-span tall-span'>
                            <label htmlFor="historyRaids">Raid History</label>
                            <textarea
                                value={values.historyRaids}
                                onChange={handleChange}
                                id="historyRaids"
                                type="text"
                                placeholder="Please detail your past raid experience"
                                onBlur={handleBlur}
                                className={errors.historyRaids && touched.historyRaids ? inputError : ''} />
                            {errors.historyRaids && touched.historyRaids && <p className={inputErrorText}>{errors.historyRaids}</p>}
                        </div>   
                        
                        <div className='application-form-question wide-span tall-span'>
                            <label htmlFor="historyGuilds">Guild History</label>
                            <textarea
                                value={values.historyGuilds}
                                onChange={handleChange}
                                id="historyGuilds"
                                type="text"
                                placeholder="List your recent guilds and reasons for leaving"
                                onBlur={handleBlur}
                                className={errors.historyGuilds && touched.historyGuilds ? inputError : ''} />
                            {errors.historyGuilds && touched.historyGuilds && <p className={inputErrorText}>{errors.historyGuilds}</p>}
                        </div>   

                    </div>
                </div>

                <div className="application-form-section">
                    <h2 className="application-form-section-header">Misc</h2>

                    <div className='application-form-section-questions'>
                        
                        <div className='application-form-question wide-span tall-span'>
                            <label htmlFor="extraInfo">Is there anything else you think we should know about you?</label>
                            <textarea
                                value={values.extraInfo}
                                onChange={handleChange}
                                id="extraInfo"
                                type="text"
                                placeholder="ex: Something that sets you apart from others"
                                onBlur={handleBlur}
                                className={errors.extraInfo && touched.extraInfo ? inputError : ''} />
                            {errors.extraInfo && touched.extraInfo && <p className={inputErrorText}>{errors.extraInfo}</p>}
                        </div>   

                    </div>
                </div>                
                <button id='submit-btn' type='submit' disabled={isSubmitting}>Submit</button> 
                {!(dirty && isValid) && submitCount > 0 && <p className={inputErrorText}>Please fix errors before submitting</p>}          
            </form>
        </div>
    );
};

export default AppForm;