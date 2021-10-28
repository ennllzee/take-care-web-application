import { gql } from "@apollo/client";

const useCustomerApi = () => {
  const GET_SINGLE_CUSTOMER = gql`
    query GET_SINGLE_CUSTOMER($getCustomerId: ID!) {
      getCustomer(_id: $getCustomerId) {
        _id
        FirstName
        LastName
        Gender
        DOB
        PhoneNumber
        Email
        EmergencyTel
        GoogleId
        Avatar {
          filename
          mimetype
          data
        }
        CongenitalDisorders
        Role
        CreatedAt
        UpdatedAt
        Gmail
      }
    }
  `;

  const SIGNUP_CUSTOMER = gql`
    mutation CREATE_USER($createdCustomerInput: CustomerSigninInput!) {
      createdCustomer(input: $createdCustomerInput) {
        _id
        FirstName
        LastName
        Gender
        DOB
        PhoneNumber
        Email
        EmergencyTel
        Avatar {
          filename
          mimetype
          data
        }
        CongenitalDisorders
        Role
        CreatedAt
        UpdatedAt
      }
    }
  `;

  const UPDATE_CUSTOMER = gql`
    mutation UPDATE_CUSTOMER(
      $updateCustomerId: ID!
      $updateCustomerInput: CustomerUpdateInput!
    ) {
      updateCustomer(_id: $updateCustomerId, input: $updateCustomerInput) {
        _id
      }
    }
  `;

  const DELETE_CUSTOMER = gql`
    mutation DELETE_CUSTOMER($deleteCustomerId: ID!) {
      deleteCustomer(_id: $deleteCustomerId) {
        _id
      }
    }
  `;

  const LOGIN_CUSTOMER = gql`
    query LOGIN_CUSTOMER($loginCustomerToken: String) {
      loginCustomer(Token: $loginCustomerToken) {
        _id
      }
    }
  `;

  const GET_SINGLE_APPOINTMENT = gql`
    query GET_SINGLE_APPOINTMENT($getAppointmentId: ID) {
      getAppointment(_id: $getAppointmentId) {
        _id
        AppointTime
        BeginTime
        EndTime
        Customer {
          _id
          FirstName
          LastName
          Gender
          DOB
          PhoneNumber
          Email
          Gmail
          EmergencyTel
          Avatar {
            filename
            mimetype
            data
          }
          CongenitalDisorders
        }
        Guide {
          _id
          FirstName
          LastName
          Gender
          DOB
          Address
          ContactAddress
          PhoneNumber
          Email
          IsVerified
          Education {
            Degree
            Acadamy
          }
          WorkExp {
            JobTitle
            WorkPlace
          }
          LangSkill {
            Language
            Level
          }
          IdCard
          VerifyDate
          Avatar {
            filename
            mimetype
            data
          }
          Status {
            Tag
            Details
          }
        }
        Department {
          _id
          Name
        }
        Hospital {
          _id
          Name
        }
        Review {
          Star
          Comment
        }
        Record {
          At
          Title
          Description
        }
        OpenLink
        Note
        Status {
          Tag
          Details
        }
        Period
      }
    }
  `;

  const GET_ALLAPPOINTMENT_BY_CUSTOMER = gql`
    query GET_ALLAPPOINTMENT_BY_CUSTOMER(
      $getAllAppointmentByCustomerCustomerId: ID!
    ) {
      getAllAppointmentByCustomer(
        CustomerId: $getAllAppointmentByCustomerCustomerId
      ) {
        _id
        AppointTime
        BeginTime
        EndTime
        Guide {
          FirstName
          LastName
          Email
          Gender
          PhoneNumber
          LangSkill {
            Language
            Level
          }
          Avatar {
            filename
            mimetype
            data
          }
          Rating
          Tips
        }
        Department {
          Name
        }
        Hospital {
          Name
        }
        Review {
          Star
          Comment
        }
        Record {
          At
          Title
          Description
        }
        OpenLink
        Note
        Status {
          Tag
          Details
        }
        Period
        CreatedAt
        UpdatedAt
        Price
      }
    }
  `;

  const CREATE_APPOINTMENT = gql`
    mutation CreateAppointmentMutation(
      $createAppointmentInput: BookingAppointmentInput
    ) {
      createAppointment(input: $createAppointmentInput) {
        _id
        AppointTime
      }
    }
  `;

  const UPDATE_APPOINTMENT_GUIDE_REQUEST = gql`
    mutation UpdateAppointmentRequestGuideMutation(
      $updateAppointmentRequestGuideId: ID!
      $updateAppointmentRequestGuideScheduleId: ID!
      $updateAppointmentRequestGuidePeriod: String!
    ) {
      updateAppointmentRequestGuide(
        _id: $updateAppointmentRequestGuideId
        ScheduleId: $updateAppointmentRequestGuideScheduleId
        Period: $updateAppointmentRequestGuidePeriod
      ) {
        _id
        AppointTime
        Guide {
          FirstName
          LastName
          Email
        }
        Department {
          Name
        }
        Hospital {
          Name
        }
        Status {
          Tag
          Details
        }
        Period
        CreatedAt
        UpdatedAt
      }
    }
  `;

  const UPDATE_APPOINTMENT_REVIEW = gql`
    mutation UpdateAppointmentReviewMutation(
      $id: ID!
      $reviewinput: ReviewInput
    ) {
      updateAppointmentReview(_id: $id, reviewinput: $reviewinput) {
        _id
      }
    }
  `;

  const UPDATE_APPOINTMENT_BEGINTIME = gql`
    mutation UPDATE_APPOINTMENT_BEGINTIME(
      $updateAppointmentBeginTimeId: ID!
      $updateAppointmentBeginTimeBeginTime: String!
    ) {
      updateAppointmentBeginTime(
        _id: $updateAppointmentBeginTimeId
        BeginTime: $updateAppointmentBeginTimeBeginTime
      ) {
        _id
        BeginTime
      }
    }
  `;

  const DELETE_APPOINTMENT = gql`
    mutation DELETE_APPOINTMENT($deleteAppointmentId: ID!) {
      deleteAppointment(_id: $deleteAppointmentId)
    }
  `;

  const CREATE_REPORT = gql`
    mutation CreateReportMutation($input: ReportInput!) {
      createReport(input: $input) {
        _id
        Title
        Description
        Reporter {
          ... on Customer {
            _id
            FirstName
            LastName
            Email
            Gmail
          }
        }
        CreatedAt
        UpdatedAt
      }
    }
  `;

  const GET_ALLHOSPITAL = gql`
    query GET_ALLHOSPITAL {
      getAllHospital {
        _id
        Name
        Address
        Building {
          _id
          Name
          Department {
            _id
            Name
          }
        }
        Department {
          _id
          Name
        }
        CreatedAt
        UpdatedAt
      }
      getAllDepartment {
        _id
        Name
        Building {
          _id
          Name
        }
        Hospital {
          _id
          Name
        }
      }
    }
  `;

  const GET_ALLBUILDING = gql`
    query GET_ALLBUILDING {
      getAllBuilding {
        _id
        Name
        Department {
          _id
          Name
        }
      }
    }
  `;

  const GET_ALLDEPARTMENT = gql`
    query GET_ALLDEPARTMENT {
      getAllDepartment {
        _id
        Name
        Building {
          _id
          Name
        }
      }
    }
  `;

  const GET_AVAILABLE_GUIDE = gql`
    query GET_AVAILABLE_GUIDE(
      $getAvailableGuideCustomerId: ID
      $getAvailableGuideDate: String!
      $getAvailableGuidePeriod: String!
    ) {
      getAvailableGuide(
        CustomerId: $getAvailableGuideCustomerId
        Date: $getAvailableGuideDate
        Period: $getAvailableGuidePeriod
      ) {
        _id
        ScheduleDate
        Period
        Createdby {
          FirstName
          LastName
          PhoneNumber
          Email
          LangSkill {
            Language
            Level
          }
          Status {
            Tag
            Details
          }
          _id
          Gender
          Avatar {
            filename
            mimetype
            data
          }
          Tips
          Rating
        }
        AvailableMorning
        AvailableAfternoon
      }
    }
  `;

  const GET_EXTENDTION_DATA = gql`
    query GET_EXTENDTION_DATA {
      getAppointmentStatus
      getPeriod
    }
  `;

  const UPLOAD_PROFILE = gql`
    mutation AddCustomerProfileMutation(
      $addCustomerProfileCustomerId: ID!
      $addCustomerProfileFile: Upload
    ) {
      addCustomerProfile(
        customerId: $addCustomerProfileCustomerId
        file: $addCustomerProfileFile
      )
    }
  `;

  const GET_ALL_APPOINTMENT = gql`
    query GET_ALL_APPOINTMENT {
      getAllAppointment {
        _id
        AppointTime
        BeginTime
        EndTime
        Customer {
          _id
          FirstName
          LastName
          Gender
          DOB
          PhoneNumber
          Email
          Gmail
          EmergencyTel
          Avatar {
            filename
            mimetype
            data
          }
          CongenitalDisorders
        }
        Guide {
          _id
          FirstName
          LastName
          Gender
          DOB
          Address
          ContactAddress
          PhoneNumber
          Email
          IsVerified
          Education {
            Degree
            Acadamy
          }
          WorkExp {
            JobTitle
            WorkPlace
          }
          LangSkill {
            Language
            Level
          }
          IdCard
          VerifyDate
          Avatar {
            filename
            mimetype
            data
          }
          Status {
            Tag
            Details
          }
        }
        Department {
          _id
          Name
        }
        Hospital {
          _id
          Name
        }
        Review {
          Star
          Comment
        }
        Record {
          At
          Title
          Description
        }
        OpenLink
        Note
        Status {
          Tag
          Details
        }
        Period
      }
    }
  `;
  return {
    GET_SINGLE_CUSTOMER,
    SIGNUP_CUSTOMER,
    UPDATE_CUSTOMER,
    DELETE_CUSTOMER,
    LOGIN_CUSTOMER,
    GET_SINGLE_APPOINTMENT,
    GET_ALLAPPOINTMENT_BY_CUSTOMER,
    CREATE_APPOINTMENT,
    UPDATE_APPOINTMENT_GUIDE_REQUEST,
    DELETE_APPOINTMENT,
    UPDATE_APPOINTMENT_BEGINTIME,
    UPDATE_APPOINTMENT_REVIEW,
    CREATE_REPORT,
    GET_ALLHOSPITAL,
    GET_ALLBUILDING,
    GET_ALLDEPARTMENT,
    GET_AVAILABLE_GUIDE,
    GET_EXTENDTION_DATA,
    UPLOAD_PROFILE,
    GET_ALL_APPOINTMENT,
  };
};

export default useCustomerApi;
