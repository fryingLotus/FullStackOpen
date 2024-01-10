import React, { useState } from 'react';
import './Practice.css';

const Practice = () => {

    const [slstate, setState] = useState('state1');
    const [slDistrict, setDistrict] = useState('AKOLA');
    const [slCity, setCity] = useState('PHNOM PENH');
    const [slCourse, setCourse] = useState('Software Engineer');
    const [submittedData, setSubmittedData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    address: '',
    sex: '', 
    pincode:'',
    emailID:'',
    mobileNo:'',
    state:'',
    district:'',
    city:'',
    course:'',
    dob:'',
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleSexChange = (e) => {
    setFormData({ ...formData, sex: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData); 
    console.log('Form data:', formData);
  
  
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setState(selectedState);
    setFormData({...formData,state: selectedState});
  }

  const handleDistrictChange = (e) => {
    const selectedDis = e.target.value;
    setDistrict(selectedDis);
    setFormData({...formData,district: selectedDis});
  }

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);
    setFormData({...formData,city: selectedCity});
    
  }

  const handleCourseChange = (e) => {
    const selectedCourse = e.target.value;
    setCourse(selectedCourse);
    setFormData({...formData,course: selectedCourse});
  }

  return (
    <>
      <form className="grid-container" onSubmit={handleSubmit}>
        <h1>ITI STUDENT INFO</h1>
        <p>Name</p>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        <p>Father Name</p>
        <input type="text" name="fatherName" value={formData.fatherName} onChange={handleInputChange} />
        <p>Address</p>
        <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
        <div className="sexList">
          <p>Sex</p>
          <label>
            <input
              type="radio"
              name="sex"
              value="male"
              checked={formData.sex === 'male'}
              onChange={handleSexChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="sex"
              value="female"
              checked={formData.sex === 'female'}
              onChange={handleSexChange}
            />
            Female
          </label>
          
        </div>
        <p>State</p>
        <div>
        <select onChange={handleStateChange} value={slstate}>
            <option value="state1">State 1</option>
            <option value="state2">State 2</option>
          </select>
        </div>
        <p>District</p>
        <div>
            <select onChange={handleDistrictChange} value={slDistrict}>
                <option value="AKOLA">AKOLA</option>
                <option value="ESTUS">ESTUS</option>

            </select>
        </div>
        <p>City</p>
        <div>
            <select onChange={handleCityChange} value={slCity}>
                <option value="PHNOM PENH">PHNOM PENH</option>
                <option value="PARIS">PARIS</option>

            </select>
        </div>
        <p>Pincode</p>
        <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} />

  
       
        <p>Course</p>
        <div>
        <select onChange={handleCourseChange} value={slCourse}>
                <option value="Software Engineer">Software Engineer</option>
                <option value="BIT">BIT</option>

            </select>
        </div> 
        <p>Email ID</p>
        <input type="text" name="emailID" value={formData.emailID} onChange={handleInputChange} />

        <p>DOB</p>
        <input type="text" name="dob" value={formData.dob} onChange={handleInputChange} />

        <p>Phone Number</p>
        <input type="text" name="mobileNo" value={formData.mobileNo} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
        <p>
        {submittedData && (
        <div className="submitted-data">
          <h2>Submitted Form Data:</h2>
          <p>Name: {submittedData.name}</p>
          <p>Father's Name: {submittedData.fatherName}</p>
          <p>Address: {submittedData.address}</p>
          <p>Sex: {submittedData.sex}</p>
          <p>State: {submittedData.state}</p>
          <p>District: {submittedData.district}</p>
          <p>City: {submittedData.city}</p>
          <p>Pincode: {submittedData.pincode}</p>
          <p>Course: {submittedData.course}</p>
          <p>Email ID: {submittedData.emailID}</p>
          <p>Date of Birth: {submittedData.dob}</p>
          <p>Phone Number: {submittedData.mobileNo}</p>
        </div>
      )}
 
        </p>
    </>
  );
};

export default Practice;
