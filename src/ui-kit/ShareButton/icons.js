const icons = {
  email: (
    <svg
      width="29px"
      height="29px"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="512" cy="512" r="512" style={{ fill: '#607d8b' }} />
      <path
        d="M690.7 307.8H333.3c-42.3 0-76.6 34.3-76.6 76.6v255.3c0 42.3 34.3 76.6 76.6 76.6h357.4c42.3 0 76.6-34.3 76.6-76.6V384.3c0-42.3-34.3-76.5-76.6-76.5zm-10.4 51L530.1 508.9c-9.9 10-26.1 10.1-36.1.1l-.1-.1-150.2-150.1h336.6zm36 280.9c0 14.1-11.4 25.5-25.5 25.5H333.3c-14.1 0-25.5-11.4-25.5-25.5V394.8l150.1 150.1c29.9 29.9 78.3 29.9 108.3 0l150.1-150.1v244.9z"
        style={{ fill: '#fff' }}
      />
    </svg>
  ),
  facebook: (
    <svg
      width="30px"
      height="30px"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        fill="#1877F2"
        d="M15 8a7 7 0 00-7-7 7 7 0 00-1.094 13.915v-4.892H5.13V8h1.777V6.458c0-1.754 1.045-2.724 2.644-2.724.766 0 1.567.137 1.567.137v1.723h-.883c-.87 0-1.14.54-1.14 1.093V8h1.941l-.31 2.023H9.094v4.892A7.001 7.001 0 0015 8z"
      />
      <path
        fill="#ffffff"
        d="M10.725 10.023L11.035 8H9.094V6.687c0-.553.27-1.093 1.14-1.093h.883V3.87s-.801-.137-1.567-.137c-1.6 0-2.644.97-2.644 2.724V8H5.13v2.023h1.777v4.892a7.037 7.037 0 002.188 0v-4.892h1.63z"
      />
    </svg>
  ),
  twitter: (
    <svg
      width="30px"
      height="30px"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="24" cy="24" r="20" fill="#1DA1F2" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M36 16.3086C35.1177 16.7006 34.1681 16.9646 33.1722 17.0838C34.1889 16.4742 34.9697 15.5095 35.3368 14.36C34.3865 14.9247 33.3314 15.3335 32.2107 15.5551C31.3123 14.5984 30.0316 14 28.6165 14C25.8975 14 23.6928 16.2047 23.6928 18.9237C23.6928 19.3092 23.7368 19.6852 23.8208 20.046C19.7283 19.8412 16.1005 17.8805 13.6719 14.9015C13.2479 15.6287 13.0055 16.4742 13.0055 17.3766C13.0055 19.0845 13.8735 20.5916 15.1958 21.4747C14.3878 21.4491 13.6295 21.2275 12.9647 20.8587V20.9203C12.9647 23.3066 14.663 25.296 16.9141 25.7496C16.5013 25.8616 16.0661 25.9224 15.6174 25.9224C15.2998 25.9224 14.991 25.8912 14.6902 25.8336C15.3166 27.7895 17.1357 29.2134 19.2899 29.2534C17.6052 30.5733 15.4822 31.3612 13.1751 31.3612C12.7767 31.3612 12.3848 31.338 12 31.2916C14.1791 32.6884 16.7669 33.5043 19.5475 33.5043C28.6037 33.5043 33.5562 26.0016 33.5562 19.4956C33.5562 19.282 33.5522 19.0693 33.5418 18.8589C34.5049 18.1629 35.34 17.2958 36 16.3086Z"
        fill="white"
      />
    </svg>
  ),
  linkedin: (
    <svg
      width="30px"
      height="30px"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="24" cy="24" r="20" fill="#0077B5" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.7747 14.2839C18.7747 15.529 17.8267 16.5366 16.3442 16.5366C14.9194 16.5366 13.9713 15.529 14.0007 14.2839C13.9713 12.9783 14.9193 12 16.3726 12C17.8267 12 18.7463 12.9783 18.7747 14.2839ZM14.1199 32.8191V18.3162H18.6271V32.8181H14.1199V32.8191Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M22.2393 22.9446C22.2393 21.1357 22.1797 19.5935 22.1201 18.3182H26.0351L26.2432 20.305H26.3322C26.9254 19.3854 28.4079 17.9927 30.8101 17.9927C33.7752 17.9927 35.9995 19.9502 35.9995 24.219V32.821H31.4922V24.7838C31.4922 22.9144 30.8404 21.6399 29.2093 21.6399C27.9633 21.6399 27.2224 22.4999 26.9263 23.3297C26.8071 23.6268 26.7484 24.0412 26.7484 24.4574V32.821H22.2411V22.9446H22.2393Z"
        fill="white"
      />
    </svg>
  ),
  copy: (
    <svg
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Interface / Link_Horizontal">
        <path
          id="Vector"
          d="M8 12H16M15 8H17C19.2091 8 21 9.79086 21 12C21 14.2091 19.2091 16 17 16H15M9 8H7C4.79086 8 3 9.79086 3 12C3 14.2091 4.79086 16 7 16H9"
          stroke="#000000"
          stroke-width="2"
        />
      </g>
    </svg>
  ),
  share: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.5344 10.2844L17.0344 14.7844C16.8904 14.922 16.6992 14.9992 16.5 15C16.4005 14.9996 16.3019 14.9805 16.2094 14.9438C16.0729 14.8864 15.9564 14.7899 15.8747 14.6664C15.7929 14.543 15.7495 14.3981 15.75 14.25V10.5C13.9207 10.4985 12.1429 11.1058 10.6967 12.226C9.25056 13.3463 8.21827 14.9159 7.7625 16.6875C7.71927 16.8486 7.62425 16.9909 7.49209 17.0926C7.35993 17.1942 7.19799 17.2496 7.03125 17.25L6.84375 17.2219C6.6529 17.1712 6.48975 17.0473 6.3897 16.877C6.28966 16.7068 6.26079 16.5039 6.30938 16.3125C6.84831 14.2188 8.06849 12.3639 9.77771 11.0399C11.4869 9.71602 13.588 8.99836 15.75 9.00002V5.25002C15.7495 5.10196 15.7929 4.95706 15.8747 4.83361C15.9564 4.71015 16.0729 4.61365 16.2094 4.55627C16.3479 4.50224 16.4989 4.48853 16.6449 4.51674C16.7909 4.54494 16.9259 4.61391 17.0344 4.71565L21.5344 9.21565C21.6752 9.35785 21.7542 9.54989 21.7542 9.75002C21.7542 9.95016 21.6752 10.1422 21.5344 10.2844V10.2844ZM18 19.5H3.75V8.25002C3.75 8.05111 3.67098 7.86035 3.53033 7.71969C3.38968 7.57904 3.19891 7.50002 3 7.50002C2.80109 7.50002 2.61032 7.57904 2.46967 7.71969C2.32902 7.86035 2.25 8.05111 2.25 8.25002V19.5C2.25 19.8979 2.40804 20.2794 2.68934 20.5607C2.97064 20.842 3.35218 21 3.75 21H18C18.1989 21 18.3897 20.921 18.5303 20.7804C18.671 20.6397 18.75 20.4489 18.75 20.25C18.75 20.0511 18.671 19.8603 18.5303 19.7197C18.3897 19.579 18.1989 19.5 18 19.5Z"
        fill="#27272E"
      />
    </svg>
  ),
};

export default icons;