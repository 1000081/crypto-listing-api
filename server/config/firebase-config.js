const admin = require("firebase-admin");

const googleServiceAccountCreds =
  "ewogICJ0eXBlIjogInNlcnZpY2VfYWNjb3VudCIsCiAgInByb2plY3RfaWQiOiAiY3J5cHRvLWxpc3RpbmctdWktNzZiOTgiLAogICJwcml2YXRlX2tleV9pZCI6ICJhNDUzNTU5MGY0NDgzNzBmZTlhZWYxYjE2MzI3ZDA0MjdjNTE0Y2ZkIiwKICAicHJpdmF0ZV9rZXkiOiAiLS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tXG5NSUlFdmdJQkFEQU5CZ2txaGtpRzl3MEJBUUVGQUFTQ0JLZ3dnZ1NrQWdFQUFvSUJBUUNTRHFOOW81TjZZbUhOXG5tWlFIK2V3TFZ6Nk1GenpsVkY0ckt0THV2VGxFNDV4LzU1SGJmdUZIR09FWHFGNUhGRXcvSnNPeGpETnNieTVVXG45ejJDRGlkU0FWclFYd3FXNE5kWFBKVHlMdTRBcXRJMmU2S2ZSWUxac1lORm1RQ3oxMzBSUFQyZWw4NGpsU1JFXG5WalVQMWZqRnJMYS9MSEdOaWZWRFhFRlNzRnVWcjdWa1N5R0gxZk5pMzNBYk96cFpDTlNaaXRzQTg2dXhLM2wzXG50Z0FkdkNCWi9iNW9xUWhpOEpyTkRIV2Fud2M5UHd2MlQvV09JNkgxRUQzQkNwd0YyL0I1SERSRHRTTGZoWnNqXG5HLzZvbC9Yem42aU0yc3ZweUdyYklxZERKb1lnY3Z4UFhrTXZJOFlxQWs5T1lsbndyQzlIcHdTcWZlb0g1cmF0XG5UV0RNbXlmbEFnTUJBQUVDZ2dFQUZiWEtWSHNUaVY0RlZxZk02ckNhQndlRld4SjdNVVZzcC9MNkhwV081VEFHXG5DN2NTcGJOQzdpd0REVjZ3QU5YQ0RhTUg5S1MzNGhiV3ByZUhjNFVDRUR6MlVFSElVNndCSmt6eGdOdzc4V3B5XG55N2x0NzBuSVRPNkhhamwzY3NRRnFhSFdQblFuSm4vZFA3RW11djlkdHBoWkk2cUtDSFZvdVFZR0NiSUFNd3dOXG5JendqMzJSWE1yTWxKM1NZekFhakZYZEFwRGtVdzlWVXJkK3ZjVUphRURKOHhaeHhGQjRXUkIyM1V5b0VScmVhXG5kWkJiYUJwaWYxUjVJVmNoY1B5YUdWL05Sa0RVU25OSVZGSG5vUmZob25XbXhYL3B4SE1qZWdZODlaQW1uSlhxXG5WWHRqZWllbXJQM0E0N1JzRERhV2lxYzN5aXRrdUtaQTYva2p6ZWlQZ3dLQmdRREdycUVlTGpJZFBYY1kyQklPXG5MS1VkUm5ydGlKRlRHS2xpaEJoa01zNi9mNjZudVEwVWo0b2FVTE1WS1BQdDN0VUpITHFnRHRPQ0tsQmRxRnJqXG4ybzRUL29YdzZra1VTc1RYYjhoY0hkWGs0R1E0VVpwbkNmWUJzbG9UckZ4RkxPbHBPbmROMHhXR1NFWWNMbzVOXG5SQ3htYWtkQWVzOTMyNTJuSGRXNk00dVhPd0tCZ1FDOE1YaktBZ0dJZHFEQTFqMVYxZ1kySHBZeThMWVpQUkVXXG5sMnNReStJMjIyeXFzNS9TMjFoMWFyUDU2eHY0YUl4R1ZMR1NacE9Vbjh2M0JGT0MwYTFwSFA3cXBGclh4S2lEXG5zY3ZkT1VxNTcrUmgwREtuOUxRTUJXZm9rWVNsK2RmK2dFWU5IVzI5YWhMNkp1QkovamxxUUxxNGQvaVZNOE0wXG5oNHJrb1FPTFh3S0JnQTljY3hLTlNjeWU4dlZWeDFlWE5oRGtZUjY2WDFvSVh4aEIxRXp5N0s4N3BQcE13V2trXG5pKzNxN1YybWMrMmhPK0ZmZWtKand4Q2VTdVppM053ZkNyc2JBNm9Ud3lDeGd6U1E3UEhLVUw1SVp4Yy9uK3QxXG5ocktzNG5BQTlJVllxcGM3TVB3d1pNcWtEZCtoN2RpbGU3VlRaRHpsQWVObmRISDJTWThDNnpqL0FvR0JBSUE1XG5RUEI2YjJyNFVNMHk2N1dKVHRBZkJQMk9UclJoakR3VlRTaXprZDBJb2tDb2hIUFphYXNPMmJPbGduZzlXNTRyXG41SlU0ZU1OaUlVbWIwLzZsT0g4Tzk0ME9FS3RFM2dCazZ0OC9RdS92U0c5d3VLTUJNbytpTzBzVm93aW5jNGgvXG5BN3U1Mm1TZFduTEFmRDlPRFBhZFJkdWNPbTRHUjdHSnpKTzhOVHNIQW9HQkFLN01TNlRUSURWdnNha3NwUlJaXG5wZkY1U1pGYUxUZGFnTDBzZUFuazJickVHZHQyNUpOVTRKdXVFdnZhalZpckhKUlFoYi9sdE1JUm5UN2xXZUpWXG5PWlg2Qzd1akg1ZVlGcDR4MUV5L2g1dkp5ZG05K01nQkQxZW1IUnJhVEVZT0ErM0pWUWVJbnduc1ovQnFYOGx4XG5TUWlBMWhDVUtneVRvVVJldjhOd0JjWDBcbi0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS1cbiIsCiAgImNsaWVudF9lbWFpbCI6ICJmaXJlYmFzZS1hZG1pbnNkay1xM2h4MUBjcnlwdG8tbGlzdGluZy11aS03NmI5OC5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsCiAgImNsaWVudF9pZCI6ICIxMDkxNTU0OTg4OTQ3NTg0MDgwNjkiLAogICJhdXRoX3VyaSI6ICJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvYXV0aCIsCiAgInRva2VuX3VyaSI6ICJodHRwczovL29hdXRoMi5nb29nbGVhcGlzLmNvbS90b2tlbiIsCiAgImF1dGhfcHJvdmlkZXJfeDUwOV9jZXJ0X3VybCI6ICJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9vYXV0aDIvdjEvY2VydHMiLAogICJjbGllbnRfeDUwOV9jZXJ0X3VybCI6ICJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9yb2JvdC92MS9tZXRhZGF0YS94NTA5L2ZpcmViYXNlLWFkbWluc2RrLXEzaHgxJTQwY3J5cHRvLWxpc3RpbmctdWktNzZiOTguaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iCn0K";

// console.log(
//   "googleServiceAccountCreds-----------------" + googleServiceAccountCreds
// );

if (!googleServiceAccountCreds)
  throw new Error(
    "The $FIRE_BASE_SYSTEM_ACCOUNT environment variable was not found!"
  );

admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(
      Buffer.from(googleServiceAccountCreds, "base64").toString("ascii")
    )
  ),
});

module.exports = admin;
