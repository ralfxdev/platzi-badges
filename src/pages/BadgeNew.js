import React, {useState} from 'react';
import Badge from "../components/Badge"
import BadgeForm from "../components/BadgeForm"
import PageLoading from '../components/PageLoading'
import PageError from '../components/PageError'
import api from "../api"
import header from '../images/platziconf-logo.svg'
import './styles/BadgeNew.css'
const BadgeNew = (props) => {

    const [formData,setFormData] = useState({})
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit = async (e)=>{
        setError(null)
        setLoading(true)
        e.preventDefault()
        try{
            await api.badges.create(formData)
            setLoading(false)
            props.history.push('/badges')
        }
        catch(error){
            setLoading(false)
            setError(error)
        }
    }

    return ( 
        <div>
            {loading && <PageLoading/>}
            {error && <PageError error={error}/>}
            {!loading && !error && <React.Fragment>
                <div className="BadgeNew__hero">
                    <img className="BadgeNew__hero-image img-fluid" src={header} alt=""></img>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <Badge 
                            first_name={formData.first_name || 'FIRST_NAME'} 
                            last_name={formData.last_name || 'LAST_NAME'} 
                            twitter={formData.twitter || '@twitter'} 
                            job_title={formData.job_title || 'JOB_TITLE'} 
                            email={formData.email || 'EMAIL'} /> 
                        </div>
                        <div className="col-6">
                            <BadgeForm handleChange={handleChange} onSubmit={handleSubmit} formData={formData}/>
                        </div>
                    </div>
                </div>
            </React.Fragment>}
        </div>
     );
}
 
export default BadgeNew;