import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import LanguageSelection from './pages/LanguageSelection';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyOtp from './pages/VerifyOtp';
import ForgotPassword from './pages/ForgotPassword';
import DashboardPlaceholder from './pages/DashboardPlaceholder';
import HomeDashboard from './pages/HomeDashboard';
import DigitalProfile from './pages/DigitalProfile';
import WorkOpportunitiesList from './pages/WorkOpportunitiesList';
import SkillTrainingCourses from './pages/SkillTrainingCourses';
import FundingSchemes from './pages/FundingSchemes';
import WorkOpportunityDetails from './pages/WorkOpportunityDetails';
import TailoringJobs from './jobs/TailoringJobs';
import HandicraftsJobs from './jobs/HandicraftsJobs';
import FoodProcessingJobs from './jobs/FoodProcessingJobs';
import AgricultureJobs from './jobs/AgricultureJobs';
import DairyJobs from './jobs/DairyJobs';
import BeautyJobs from './jobs/BeautyJobs';
import DomesticJobs from './jobs/DomesticJobs';
import AnganwadiJobs from './jobs/AnganwadiJobs';
import MushroomJobs from './jobs/MushroomJobs';
import GoatFarmJobs from './jobs/GoatFarmJobs';

// Scheme-Specific Assisted Application Workflows
import SchemeDetails from './pages/SchemeDetails';
import JobCardCheck from './pages/JobCardCheck';
import JobCardGuidance from './pages/JobCardGuidance';
import VbgramgWorkApplicationForm from './pages/VbgramgWorkApplicationForm';
import GeneralWorkSchemeApplicationForm from './pages/GeneralWorkSchemeApplicationForm';
import ApplicationGuidance from './pages/ApplicationGuidance';
import VbgramgWorkGuidance from './pages/VbgramgWorkGuidance';
import TrainingCourseDetails from './pages/TrainingCourseDetails';
import TrainingEnrollmentConfirmation from './pages/TrainingEnrollmentConfirmation';
import TrainingEnrollmentForm from './pages/TrainingEnrollmentForm';
import FundingSchemeDetails from './pages/FundingSchemeDetails';
import FundingApplyGuidance from './pages/FundingApplyGuidance';
import FundingRedirectFlow from './pages/FundingRedirectFlow';
import RSLDCDashboard from './rsldc/RSLDCdashboard';
import FindJobs from './pages/FindJobs';
import ApplyJob from './pages/ApplyJob';
import ApplicationSubmitted from './pages/ApplicationSubmitted';
import MyApplications from './pages/MyApplications';
import WelfareSchemes from './pages/WelfareSchemes';
import SkillAssessment from './rsldc/SkillAssessment';
import AllGovernmentServices from './rsldc/AllGovernmentServices';
import AllTrainingCourses from './rsldc/AllTrainingCourses';
import NearbyTrainingCentres from './rsldc/NearbyTrainingCentres';
import MyCertificates from './rsldc/MyCertificates';
import PlacementAssistance from './rsldc/PlacementAssistance';
import HelpSupport from './rsldc/HelpSupport';
import CourseDetails from './rsldc/CourseDetails';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Earnings from './pages/Earnings';
import GlobalSearch from './pages/GlobalSearch';
import EnrollCourse from './pages/EnrollCourse';
import MyEnrollments from './pages/MyEnrollments';
import EmployerVerification from './pages/EmployerVerification';
import EmployerDashboard from './pages/EmployerDashboard';
import PostNewJob from './pages/PostNewJob';
import ManageJobs from './pages/ManageJobs';
import ApplicationsReceived from './pages/ApplicationsReceived';
import CandidateProfile from './pages/CandidateProfile';
import EmployerProfile from './pages/EmployerProfile';
import VerificationPending from './pages/VerificationPending';
import VerificationRejected from './pages/VerificationRejected';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/language" element={<LanguageSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/digital-profile" element={<DigitalProfile />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        
        {/* Assisted Application Workflows */}
        <Route path="/opportunities" element={<WorkOpportunitiesList />} />
        <Route path="/scheme-details" element={<SchemeDetails />} />
        <Route path="/vbg-job-card-check" element={<JobCardCheck />} />
        <Route path="/vbg-job-card-guidance" element={<JobCardGuidance />} />
        <Route path="/vbg-work-apply" element={<VbgramgWorkApplicationForm />} />
        <Route path="/work-scheme-apply" element={<GeneralWorkSchemeApplicationForm />} />
        <Route path="/apply-guidance" element={<ApplicationGuidance />} />
        <Route path="/vbg-work-guidance" element={<VbgramgWorkGuidance />} />
        <Route path="/training-enrollment-form" element={<TrainingEnrollmentForm />} />
        <Route path="/funding-apply-guidance" element={<FundingRedirectFlow />} />
        
        <Route path="/work-opportunity-details" element={<WorkOpportunityDetails />} />
        <Route path="/success" element={<DashboardPlaceholder />} />
        <Route path="/home" element={<HomeDashboard />} />
        <Route path="/dashboard" element={<HomeDashboard />} />
        <Route path="/tailoring-jobs" element={<TailoringJobs />} />
        <Route path="/handicrafts-jobs" element={<HandicraftsJobs />} />
        <Route path="/food-processing-jobs" element={<FoodProcessingJobs />} />
        <Route path="/agriculture-jobs" element={<AgricultureJobs />} />
        <Route path="/dairy-jobs" element={<DairyJobs />} />
        <Route path="/beauty-jobs" element={<BeautyJobs />} />
        <Route path="/domestic-jobs" element={<DomesticJobs />} />
        <Route path="/anganwadi-jobs" element={<AnganwadiJobs />} />
        <Route path="/mushroom-jobs" element={<MushroomJobs />} />
        <Route path="/goatfarm-jobs" element={<GoatFarmJobs />} />
        <Route path="/rsldc" element={<RSLDCDashboard />} />
        <Route path="/find-jobs" element={<FindJobs />} />
        <Route path="/apply-job" element={<ApplyJob />} />
        <Route path="/application-submitted" element={<ApplicationSubmitted />} />
        <Route path="/my-applications" element={<MyApplications />} />
        <Route path="/schemes" element={<WelfareSchemes />} />
        <Route path="/funding" element={<FundingSchemes />} />
        <Route path="/funding/:schemeId" element={<FundingSchemeDetails />} />
        <Route path="/funding-details" element={<FundingSchemeDetails />} />
        <Route path="/funding/:schemeId/apply" element={<FundingApplyGuidance />} />
        <Route path="/funding-apply" element={<FundingApplyGuidance />} />
        <Route path="/skill-assessment" element={<SkillAssessment />} />
        <Route path="/rsldc-services" element={<AllGovernmentServices />} />
        <Route path="/rsldc-courses" element={<AllTrainingCourses />} />
        <Route path="/training" element={<SkillTrainingCourses />} />
        <Route path="/training/:courseId" element={<TrainingCourseDetails />} />
        <Route path="/training-details" element={<TrainingCourseDetails />} />
        <Route path="/training/:courseId/enroll" element={<TrainingEnrollmentConfirmation />} />
        <Route path="/training-enrollment" element={<TrainingEnrollmentConfirmation />} />
        <Route path="/training-centres" element={<NearbyTrainingCentres />} />
        <Route path="/certificates" element={<MyCertificates />} />
        <Route path="/placements" element={<PlacementAssistance />} />
        <Route path="/support" element={<HelpSupport />} />
        <Route path="/courses/:category" element={<CourseDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/earnings" element={<Earnings />} />
        <Route path="/search" element={<GlobalSearch />} />
        <Route path="/enroll-course" element={<EnrollCourse />} />
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        <Route path="/employer-verification" element={<EmployerVerification />} />
        <Route path="/employer-dashboard" element={<EmployerDashboard />} />
        <Route path="/post-job" element={<PostNewJob />} />
        <Route path="/manage-jobs" element={<ManageJobs />} />
        <Route path="/applications" element={<ApplicationsReceived />} />
        <Route path="/candidate-profile" element={<CandidateProfile />} />
        <Route path="/employer-profile" element={<EmployerProfile />} />
        <Route path="/verification-pending" element={<VerificationPending />} />
        <Route path="/verification-rejected" element={<VerificationRejected />} />
      </Routes>
    </Router>
  );
}

export default App;
