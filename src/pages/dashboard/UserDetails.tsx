import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById } from '../../services/api';
import type { User } from '../../types';
import { routePaths } from '../../routes/route-paths';
import '../../styles/UserDetails.scss';

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    loadUser();
  }, [id]);

  const loadUser = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const userData = await getUserById(id);
      if (userData) {
        setUser(userData);
      } else {
        navigate(routePaths.dashboard.users);
      }
    } catch (error) {
      console.error('Error loading user:', error);
      navigate(routePaths.dashboard.users);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getTierStars = () => {
    return (
      <div className="user-info-card__stars">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1L10.163 5.39119L15 6.11637L11.5 9.52786L12.326 14.3836L8 12.0912L3.674 14.3836L4.5 9.52786L1 6.11637L5.837 5.39119L8 1Z" fill="#E9B200" />
        </svg>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1L10.163 5.39119L15 6.11637L11.5 9.52786L12.326 14.3836L8 12.0912L3.674 14.3836L4.5 9.52786L1 6.11637L5.837 5.39119L8 1Z" fill="#E4E4E4" />
        </svg>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1L10.163 5.39119L15 6.11637L11.5 9.52786L12.326 14.3836L8 12.0912L3.674 14.3836L4.5 9.52786L1 6.11637L5.837 5.39119L8 1Z" fill="#E4E4E4" />
        </svg>
      </div>
    );
  };

  const formatUserId = (id: string) => {
    const numericPart = id.replace('user-', '');
    return `LSQ${numericPart.padStart(5, '0')}`;
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Loading user details...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="error-state">
        <p>User not found</p>
        <button onClick={() => navigate('/dashboard/users')}>Back to Users</button>
      </div>
    );
  }

  return (
    <div className="user-details-page">
      <button className="user-details-page__back" onClick={() => navigate('/dashboard/users')}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M18 22L10 14L18 6" stroke="#545F7D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to Users
      </button>

      <div className="user-details-page__header">
        <h1 className="user-details-page__title">User Details</h1>
        <div className="user-details-page__actions">
          <button className="user-details-page__action-btn user-details-page__action-btn--blacklist">
            Blacklist User
          </button>
          <button className="user-details-page__action-btn user-details-page__action-btn--activate">
            Activate User
          </button>
        </div>
      </div>

      <div className="user-info-card">
        <div className="user-info-card__top">
          <div className="user-info-card__avatar-section">
            <div className="user-info-card__avatar">
              {getInitials(user.fullName)}
            </div>
            <div className="user-info-card__user-info">
              <div className="user-info-card__name">{user.fullName}</div>
              <div className="user-info-card__id">{formatUserId(user.id)}</div>
            </div>
          </div>

          <div className="user-info-card__divider"></div>

          <div className="user-info-card__tier">
            <div className="user-info-card__tier-label">User's Tier</div>
            {getTierStars()}
          </div>

          <div className="user-info-card__divider"></div>

          <div className="user-info-card__bank-info">
            <div className="user-info-card__balance">{user.accountBalance}</div>
            <div className="user-info-card__account">
              {user.accountNumber}/{user.bankName}
            </div>
          </div>
        </div>

        <div className="user-info-card__tabs">
          <button 
            className={`user-info-card__tab ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            General Details
          </button>
          <button className="user-info-card__tab">Documents</button>
          <button className="user-info-card__tab">Bank Details</button>
          <button className="user-info-card__tab">Loans</button>
          <button className="user-info-card__tab">Savings</button>
          <button className="user-info-card__tab">App and System</button>
        </div>
      </div>

      <div className="user-details-card">
        <div className="user-details-card__section">
          <div className="user-details-card__section-title">Personal Information</div>
          <div className="user-details-card__grid">
            <div className="user-details-card__field">
              <div className="user-details-card__label">Full Name</div>
              <div className="user-details-card__value">{user.fullName}</div>
            </div>
            <div className="user-details-card__field">
              <div className="user-details-card__label">Phone Number</div>
              <div className="user-details-card__value">{user.phoneNumber}</div>
            </div>
            <div className="user-details-card__field">
              <div className="user-details-card__label">Email Address</div>
              <div className="user-details-card__value">{user.email}</div>
            </div>
            <div className="user-details-card__field">
              <div className="user-details-card__label">BVN</div>
              <div className="user-details-card__value">{user.bvn}</div>
            </div>
            <div className="user-details-card__field">
              <div className="user-details-card__label">Gender</div>
              <div className="user-details-card__value">{user.gender}</div>
            </div>
            <div className="user-details-card__field">
              <div className="user-details-card__label">Marital Status</div>
              <div className="user-details-card__value">{user.maritalStatus}</div>
            </div>
            <div className="user-details-card__field">
              <div className="user-details-card__label">Children</div>
              <div className="user-details-card__value">{user.children}</div>
            </div>
            <div className="user-details-card__field">
              <div className="user-details-card__label">Type of Residence</div>
              <div className="user-details-card__value">{user.typeOfResidence}</div>
            </div>
          </div>
        </div>

        <div className="user-details-card__divider"></div>

        <div className="user-details-card__section">
          <div className="user-details-card__section-title">Education and Employment</div>
          <div className="user-details-card__grid">
            <div className="user-details-card__field">
              <div className="user-details-card__label">Level of Education</div>
              <div className="user-details-card__value">{user.levelOfEducation}</div>
            </div>
            <div className="user-details-card__field">
              <div className="user-details-card__label">Employment Status</div>
              <div className="user-details-card__value">{user.employmentStatus}</div>
            </div>
            <div className="user-details-card__field">
              <div className="user-details-card__label">Sector of Employment</div>
              <div className="user-details-card__value">{user.sectorOfEmployment}</div>
            </div>
            <div className="user-details-card__field">
              <div className="user-details-card__label">Duration of Employment</div>
              <div className="user-details-card__value">{user.durationOfEmployment}</div>
            </div>
            <div className="user-details-card__field">
              <div className="user-details-card__label">Office Email</div>
              <div className="user-details-card__value">{user.officeEmail}</div>
            </div>
            <div className="user-details-card__field">
              <div className="user-details-card__label">Monthly Income</div>
              <div className="user-details-card__value">{user.monthlyIncome}</div>
            </div>
            <div className="user-details-card__field">
              <div className="user-details-card__label">Loan Repayment</div>
              <div className="user-details-card__value">{user.loanRepayment}</div>
            </div>
          </div>
        </div>

        <div className="user-details-card__divider"></div>

        <div className="user-details-card__section">
          <div className="user-details-card__section-title">Socials</div>
          <div className="user-details-card__grid">
            <div className="user-details-card__field">
              <div className="user-details-card__label">Twitter</div>
              <div className="user-details-card__value">{user.twitter}</div>
            </div>
            <div className="user-details-card__field">
              <div className="user-details-card__label">Facebook</div>
              <div className="user-details-card__value">{user.facebook}</div>
            </div>
            <div className="user-details-card__field">
              <div className="user-details-card__label">Instagram</div>
              <div className="user-details-card__value">{user.instagram}</div>
            </div>
          </div>
        </div>

        <div className="user-details-card__divider"></div>

        <div className="user-details-card__section">
          <div className="user-details-card__section-title">Guarantor</div>
          <div className="user-details-card__grid">
            <div className="user-details-card__field">
              <div className="user-details-card__label">Full Name</div>
              <div className="user-details-card__value">{user.guarantorFullName}</div>
            </div>
            <div className="user-details-card__field">
              <div className="user-details-card__label">Phone Number</div>
              <div className="user-details-card__value">{user.guarantorPhoneNumber}</div>
            </div>
            <div className="user-details-card__field">
              <div className="user-details-card__label">Email Address</div>
              <div className="user-details-card__value">{user.guarantorEmailAddress}</div>
            </div>
            <div className="user-details-card__field">
              <div className="user-details-card__label">Relationship</div>
              <div className="user-details-card__value">{user.guarantorRelationship}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
