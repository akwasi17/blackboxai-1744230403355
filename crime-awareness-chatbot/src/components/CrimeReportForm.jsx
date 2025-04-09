import { useState } from 'react';
import { addDoc, collection, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeftIcon, ExclamationCircleIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';

function CrimeReportForm({ onBack }) {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    crimeType: '',
    date: '',
    time: '',
    location: '',
    description: '',
    witnessInfo: '',
    contactInfo: currentUser?.profile?.phone || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const timestamp = new Date().toISOString();
      const reportData = {
        ...formData,
        timestamp,
        status: 'pending',
        userId: currentUser.uid,
        userEmail: currentUser.email,
        userName: currentUser.profile?.name || 'Anonymous'
      };

      // Add report to reports collection
      const reportRef = await addDoc(collection(db, 'crimeReports'), reportData);

      // Update user's reports array
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        reports: arrayUnion({
          id: reportRef.id,
          type: formData.crimeType,
          timestamp,
          status: 'pending'
        })
      });

      setSuccess(true);
      setFormData({
        crimeType: '',
        date: '',
        time: '',
        location: '',
        description: '',
        witnessInfo: '',
        contactInfo: currentUser?.profile?.phone || ''
      });
    } catch (err) {
      setError('Failed to submit report. Please try again.');
      console.error('Error submitting report:', err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Report Submitted Successfully</h2>
          <p className="text-gray-600 mb-8">Thank you for your report. The authorities will review it shortly.</p>
          <button
            onClick={onBack}
            className="btn btn-primary"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 flex items-center text-primary hover:text-primary/80 transition-colors"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Chatbot
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200 bg-primary text-white px-6 py-4">
          <div className="flex items-center">
            <ShieldCheckIcon className="w-6 h-6 mr-2" />
            <div>
              <h2 className="text-xl font-semibold">Report a Crime</h2>
              <p className="text-sm text-white/80 mt-1">Please provide as much detail as possible</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
              <ExclamationCircleIcon className="w-5 h-5 text-red-400 mt-0.5 mr-2" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label htmlFor="crimeType" className="form-label">Type of Crime</label>
              <select
                id="crimeType"
                name="crimeType"
                required
                value={formData.crimeType}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select type</option>
                <option value="theft">Theft</option>
                <option value="assault">Assault</option>
                <option value="vandalism">Vandalism</option>
                <option value="fraud">Fraud</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date" className="form-label">Date of Incident</label>
              <input
                type="date"
                id="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label htmlFor="time" className="form-label">Time of Incident</label>
              <input
                type="time"
                id="time"
                name="time"
                required
                value={formData.time}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label htmlFor="location" className="form-label">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                required
                placeholder="Enter incident location"
                value={formData.location}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              required
              placeholder="Provide a detailed description of the incident"
              value={formData.description}
              onChange={handleChange}
              className="form-textarea"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="witnessInfo" className="form-label">
              Witness Information <span className="text-gray-500 text-sm">(Optional)</span>
            </label>
            <textarea
              id="witnessInfo"
              name="witnessInfo"
              placeholder="Any witness information or additional details"
              value={formData.witnessInfo}
              onChange={handleChange}
              className="form-textarea"
              rows="2"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactInfo" className="form-label">Contact Information</label>
            <input
              type="text"
              id="contactInfo"
              name="contactInfo"
              required
              placeholder="Your contact information"
              value={formData.contactInfo}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <ExclamationCircleIcon className="w-5 h-5 text-yellow-400 mt-0.5 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
                <p className="mt-1 text-sm text-yellow-700">
                  In case of emergency, please dial your local emergency number immediately.
                  This form is for non-emergency reporting only.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary min-w-[150px] ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </div>
              ) : (
                'Submit Report'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CrimeReportForm;