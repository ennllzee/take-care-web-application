import { gql } from "@apollo/client";

const useGuideApi = () => {
  const GET_SINGLE_GUIDE = gql`
    query GET_SINGLE_GUIDE($getGuideId: ID!) {
      getGuide(_id: $getGuideId) {
        _id
        FirstName
        LastName
        Gender
        DOB
        Address
        ContactAddress
        PhoneNumber
        Email
        Education {
          Degree
          Acadamy
        }
        WorkExp {
          JobTitle
          WorkPlace
        }
        LangSkill {
          Level
          Language
        }
        IdCard
        GoogleId
        Avatar {
          filename
          mimetype
          data
        }
        Role
        CreatedAt
        UpdatedAt
        Gmail
        IsVerified
        VerifyDate
        Status {
          Tag
          Details
        }
        FaceWithIdCard {
          filename
          mimetype
          data
        }
        Rating
        Tips
      }
    }
  `;

  const SIGNUP_GUIDE = gql`
    mutation SIGNUP_GUIDE($createdGuideInput: GuideSigninInput!) {
      createdGuide(input: $createdGuideInput) {
        _id
      }
    }
  `;

  const UPDATE_GUIDE = gql`
    mutation UPDATE_GUIDE($id: ID!, $input: GuideUpdateInput!) {
      updateGuide(_id: $id, input: $input) {
        _id
      }
    }
  `;

  const DELETE_GUIDE = gql`
    mutation DELETE_GUIDE($deleteGuideId: ID!) {
      deleteGuide(_id: $deleteGuideId) {
        _id
        FirstName
        LastName
        Gender
        DOB
        Address
        ContactAddress
        PhoneNumber
        Email
        IsValidated
        Education {
          Degree
          Acadamy
          Certificate
        }
        WorkExp {
          JobTitle
          WorkPlace
          JobPosition
        }
        LangSkill {
          Languages
          Level
        }
        IdCard
        FaceWithIdCard
        ValidatedDate
        GoogleId
        Avatar
        CongenitalDisorders
        Role
        CreatedAt
        UpdatedAt
      }
    }
  `;

  const LOGIN_GUIDE = gql`
    query LOGIN_GUIDE($loginGuideToken: String) {
      loginGuide(Token: $loginGuideToken) {
        _id
      }
    }
  `;

  const GET_ALL_APPOINTMENT_BY_GUIDE = gql`
    query GET_ALL_APPOINTMENT_BY_GUIDE($getAllAppointmentByGuideGuideId: ID!) {
      getAllAppointmentByGuide(GuideId: $getAllAppointmentByGuideGuideId) {
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
        Department {
          Name
        }
        Hospital {
          Name
          Address
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
        Price
      }
    }
  `;

  const GET_ALL_GUIDESCHEDULE_BYGUIDE = gql`
    query GET_ALLGUIDESCHEDULE_BYGUIDE(
      $getAllGuidescheduleByGuideGuideId: ID!
    ) {
      getAllGuidescheduleByGuide(GuideId: $getAllGuidescheduleByGuideGuideId) {
        _id
        ScheduleDate
        Period
        CreatedAt
        UpdatedAt
        AvailableMorning
        AvailableAfternoon
        WorkOnMorningAppointment {
          _id
          AppointTime
          Customer {
            FirstName
            LastName
            Email
            Gmail
            Avatar {
              _id
              filename
              mimetype
              data
            }
            CongenitalDisorders
            PhoneNumber
            Gender
            DOB
            EmergencyTel
          }
          Department {
            Name
          }
          Hospital {
            Name
          }
          Note
          Status {
            Tag
            Details
          }
          CreatedAt
          UpdatedAt
        }
        WorkOnAfternoonAppointment {
          _id
          AppointTime
          Customer {
            FirstName
            LastName
            Email
            Gmail
            Avatar {
              _id
              filename
              mimetype
              data
            }
            CongenitalDisorders
            PhoneNumber
            Gender
            DOB
            EmergencyTel
          }
          Department {
            Name
          }
          Hospital {
            Name
          }
          Note
          Status {
            Tag
            Details
          }
          CreatedAt
          UpdatedAt
        }
        ScheduleMorningStatus {
          Tag
          Details
        }
        ScheduleAfternoonStatus {
          Tag
          Details
        }
      }
    }
  `;

  const GET_SINGLE_GUIDESCHEDULE = gql`
    query GET_SINGLE_GUIDESCHEDULE($getGuidescheduleId: ID!) {
      getGuideschedule(_id: $getGuidescheduleId) {
        _id
        ScheduleDate
        Available
        Period
        WorkOnAppointment {
          _id
          AppointTime
          Customer {
            FirstName
            LastName
            Email
            Gmail
            Avatar {
              _id
              filename
              mimetype
              data
            }
            CongenitalDisorders
            PhoneNumber
            Gender
            DOB
            EmergencyTel
          }
          Department {
            Name
          }
          Hospital {
            Name
          }
          Note
          Status {
            Tag
            Details
          }
          CreatedAt
          UpdatedAt
        }
        Status {
          Tag
          Details
        }
        CreatedAt
        UpdatedAt
      }
    }
  `;

  const GET_EXTENDTION_DATA = gql`
    query GET_EXTENDTION_DATA {
      getAppointmentStatus
      getPeriod
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
        EndTime
      }
    }
  `;

  const UPDATE_APPOINTMENT_ENDTIME = gql`
    mutation UpdateAppointmentRequestGuideMutation(
      $updateAppointmentEndTimeId: ID!
      $updateAppointmentEndTimeEndTime: String!
    ) {
      updateAppointmentEndTime(
        _id: $updateAppointmentEndTimeId
        EndTime: $updateAppointmentEndTimeEndTime
      ) {
        _id
        BeginTime
        EndTime
        Price
      }
    }
  `;

  const UPDATE_APPOINTMENT_RECORD = gql`
    mutation UPDATE_APPOINTMENT_RECORD(
      $updateAppointmentRecordId: ID!
      $updateAppointmentRecordRecordinput: RecordInput
    ) {
      updateAppointmentRecord(
        _id: $updateAppointmentRecordId
        recordinput: $updateAppointmentRecordRecordinput
      ) {
        _id
        Record {
          At
          Title
          Description
        }
      }
    }
  `;

  const CREATE_GUIDESCHEDULE = gql`
    mutation CREATE_GUIDESCHEDULE(
      $createGuideScheduleInput: GuideScheduleInput
    ) {
      createGuideSchedule(input: $createGuideScheduleInput) {
        _id
        ScheduleDate
        AvailableMorning
        AvailableAfternoon
        Period
        WorkOnMorningAppointment {
          _id
        }
        WorkOnAfternoonAppointment {
          _id
        }
        Createdby {
          _id
        }
        ScheduleMorningStatus {
          Tag
          Details
        }
        ScheduleAfternoonStatus {
          Tag
          Details
        }
        CreatedAt
        UpdatedAt
      }
    }
  `;

  const UPDATE_GUIDESCHEDULE = gql`
    mutation UpdateGuideScheduleMutation(
      $updateGuideScheduleId: ID!
      $updateGuideSchedulePeriod: String!
      $updateGuideScheduleAvailable: Boolean!
    ) {
      updateGuideSchedule(
        _id: $updateGuideScheduleId
        Period: $updateGuideSchedulePeriod
        Available: $updateGuideScheduleAvailable
      ) {
        _id
        ScheduleDate
        AvailableMorning
        AvailableAfternoon
        Period
        WorkOnMorningAppointment {
          _id
        }
        WorkOnAfternoonAppointment {
          _id
        }
        Createdby {
          _id
          FirstName
          LastName
        }
        ScheduleMorningStatus {
          Tag
          Details
        }
        ScheduleAfternoonStatus {
          Tag
          Details
        }
      }
    }
  `;

  const UPDATE_GUIDESCHEDULE_RESPONSE = gql`
    mutation UPDATE_GUIDESCHEDULE_RESPONSE(
      $updateGuideScheduleResponseAppointmentId: ID!
      $updateGuideScheduleResponseAppointmentResponse: Boolean!
      $updateGuideScheduleResponseAppointmentWorkOnAppointmentId: ID!
    ) {
      updateGuideScheduleResponseAppointment(
        _id: $updateGuideScheduleResponseAppointmentId
        response: $updateGuideScheduleResponseAppointmentResponse
        WorkOnAppointmentId: $updateGuideScheduleResponseAppointmentWorkOnAppointmentId
      ) {
        _id
        ScheduleDate
        Available
        Period
        WorkOnAppointment {
          _id
        }
        Status {
          Tag
          Details
        }
        CreatedAt
        UpdatedAt
      }
    }
  `;

  const DELETE_GUIDESCHEDULE = gql`
    mutation DELETE_GUIDESCHEDULE($deleteGuideScheduleId: ID!) {
      deleteGuideSchedule(_id: $deleteGuideScheduleId) {
        _id
      }
    }
  `;

  const CREATE_REPORT = gql`
    mutation CreateReportMutation($input: ReportInput!) {
      createReport(input: $input) {
        _id
        Title
        Description
        Reporter {
          ... on Guide {
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

  const UPLOAD_PROFILE = gql`
    mutation UPLOAD_PROFILE($guideId: ID!, $file: Upload) {
      addGuideProfile(guideId: $guideId, file: $file)
    }
  `;

  const UPLOAD_CERTIFICATE = gql`
    mutation UploadCertificateGuideMutation($guideId: ID!, $file: Upload) {
      uploadCertificateGuide(guideId: $guideId, file: $file)
    }
  `;

  const UPLOAD_FACEWITHIDCARD = gql`
    mutation UploadCertificateGuideMutation(
      $uploadFaceWithIdcardGuideGuideId: ID!
      $uploadFaceWithIdcardGuideFile: Upload
    ) {
      uploadFaceWithIdcardGuide(
        guideId: $uploadFaceWithIdcardGuideGuideId
        file: $uploadFaceWithIdcardGuideFile
      )
    }
  `;

  const RESPONSE_CUSTOMER_REQUEST = gql`
    mutation RESPONSE_CUSTOMER_REQUEST(
      $updateGuideScheduleResponseAppointmentResponse: Boolean!
      $updateGuideScheduleResponseAppointmentWorkOnAppointmentId: ID!
      $updateGuideScheduleResponseAppointmentCancleDetails: String
    ) {
      updateGuideScheduleResponseAppointment(
        response: $updateGuideScheduleResponseAppointmentResponse
        WorkOnAppointmentId: $updateGuideScheduleResponseAppointmentWorkOnAppointmentId
        cancleDetails: $updateGuideScheduleResponseAppointmentCancleDetails
      ) {
        _id
        ScheduleDate
        AvailableMorning
        AvailableAfternoon
        Period
        WorkOnMorningAppointment {
          _id
        }
        WorkOnAfternoonAppointment {
          _id
        }
        ScheduleMorningStatus {
          Tag
        }
        ScheduleAfternoonStatus {
          Tag
        }
      }
    }
  `;

  const GET_ALL_RECORDTITLE = gql`
    query GET_ALL_RECORDTITLE {
      getAllRecordTitles {
        Title
      }
    }
  `;

  const UPDATE_RECORDTITLE = gql`
    mutation PostnewRecordTitlesMutation($postnewRecordTitlesNewTitle: String) {
      postnewRecordTitles(newTitle: $postnewRecordTitlesNewTitle) {
        Title
      }
    }
  `;

  const GET_DATA_APPOINTMENTPAGE = gql`
    query GET_ALL_APPOINTMENT_BY_GUIDE(
      $getAllAppointmentByGuideGuideId: ID!
      $getGuideId: ID!
    ) {
      getAllAppointmentByGuide(GuideId: $getAllAppointmentByGuideGuideId) {
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
        Department {
          Name
        }
        Hospital {
          Name
          Address
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
        Price
      }
      getGuide(_id: $getGuideId) {
        IsVerified
      }
    }
  `;

  return {
    GET_SINGLE_GUIDE,
    SIGNUP_GUIDE,
    UPDATE_GUIDE,
    DELETE_GUIDE,
    LOGIN_GUIDE,
    GET_ALL_APPOINTMENT_BY_GUIDE,
    GET_ALL_GUIDESCHEDULE_BYGUIDE,
    GET_SINGLE_GUIDESCHEDULE,
    GET_EXTENDTION_DATA,
    UPDATE_APPOINTMENT_BEGINTIME,
    UPDATE_APPOINTMENT_ENDTIME,
    UPDATE_APPOINTMENT_RECORD,
    CREATE_GUIDESCHEDULE,
    UPDATE_GUIDESCHEDULE,
    UPDATE_GUIDESCHEDULE_RESPONSE,
    DELETE_GUIDESCHEDULE,
    CREATE_REPORT,
    UPLOAD_PROFILE,
    UPLOAD_CERTIFICATE,
    UPLOAD_FACEWITHIDCARD,
    RESPONSE_CUSTOMER_REQUEST,
    GET_ALL_RECORDTITLE,
    UPDATE_RECORDTITLE,
    GET_DATA_APPOINTMENTPAGE,
  };
};

export default useGuideApi;
