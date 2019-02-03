import React, { Component } from "react";
import { decorate, observable, observe, toJS } from "mobx";
import { observer } from "mobx-react";
//import "./index.scss";
//import $ from 'jquery';

const addStyleString = str => {
  var node = document.createElement("style");
  node.innerHTML = str;
  document.body.appendChild(node);
};

let reloadSetTimeoutVar;
const reloadSetTimeout = () => {
  reloadSetTimeoutVar = setTimeout(() => {
    document.location.reload();
  }, 5000);
};
const stopSetTimeout = () => {
  clearTimeout(reloadSetTimeoutVar);
};

class Store {
  isLoading = true;
  isLoggedin = true;
  fill_auto = false;
  start = false;
  success = false;
  message = "...";
  showTable = false;
  first_name = "first name";
  last_name = "last name";
  date_of_birth = "YYYY-MM-DD";
  email = "user@email.com";
  phone_code = "213";
  phone = "600000000";
  nationality = "62";
  passport_type = "01";
  passport_no = "0000000000000";
  ppt_issue_date = "YYYY-MM-DD";
  ppt_expiry_date = "YYYY-MM-DD";
  ppt_issue_palace = "Bordj bou arreridj";
  juridiction = "15#Bordj-Bou-Arr�ridj#10";
  visa_no = "";
  visa_type = "207";
  veryfication_code = "";
}

decorate(Store, {
  selected: observable,
  users: observable,
  isLoading: observable,
  isLoggedin: observable,
  fill_auto: observable,
  success: observable,
  message: observable,
  start: observable,
  showTable: observable,
  first_name: observable,
  last_name: observable,
  date_of_birth: observable,
  email: observable,
  juridiction: observable,
  phone_code: observable,
  phone: observable,
  nationality: observable,
  passport_type: observable,
  passport_no: observable,
  ppt_issue_date: observable,
  ppt_expiry_date: observable,
  ppt_issue_palace: observable,
  visa_no: observable,
  visa_type: observable,
  veryfication_code: observable
});

const appStore = new Store();

const disposer = observe(appStore, change => {
  //console.log(change.type, change.name, "from", change.oldValue, "to", change.object[change.name]);
  localStorage.setItem("appStore", JSON.stringify(toJS(appStore)));
  if ((change.name = "start" && change.object[change.name] === false)) {
    stopSetTimeout();
  }
});

const styles = {
  input: {
    padding: 3,
    marginBottom: 3,
    border: "1px solid #000",
    borderRadius: 3
  }
};

class Table extends Component {
  _onDoubleClick(value) {
    let p = prompt("enter new value:");
    if (p !== "") {
      value = p;
    }
  }
  render() {
    const { store } = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          border: "1px dashed #000",
          marginTop: 5,
          padding: 5,
          backgroundColor: "#fff",
          borderRadius: 5
        }}
      >
        <label style={{ color: "green", padding: 3 }}>
          Double click inside field to edit
        </label>
        <div
          style={styles.input}
          onDoubleClick={() => (store.first_name = prompt("Enter new value"))}
        >
          <b>First name:</b> {store.first_name}
        </div>
        <div
          style={styles.input}
          onDoubleClick={() => (store.last_name = prompt("Enter new value"))}
        >
          <b>Last name:</b> {store.last_name}
        </div>
        <div
          style={styles.input}
          onDoubleClick={() =>
            (store.date_of_birth = prompt("Enter new value YYYY-MM-DD"))
          }
        >
          <b>Date of birth:</b> {store.date_of_birth}
        </div>
        <div
          style={styles.input}
          onDoubleClick={() => (store.email = prompt("Enter new value"))}
        >
          <b>Email:</b> {store.email}
        </div>
        <div
          style={styles.input}
          onDoubleClick={() => (store.phone = prompt("Enter new value"))}
        >
          <b>Phone:</b> {store.phone}
        </div>
        <div style={styles.input}>
          <b>Passport type:</b>
          <select
            style={{ width: "100%" }}
            value={store.passport_type}
            onChange={e => (store.passport_type = e.target.value)}
            placeholder="passportType"
          >
            <option value="02">Collective passport</option>
            <option value="13">D. Viaje Apatridas C. New York</option>
            <option value="04">Diplomatic passport</option>
            <option value="06">Government official on duty</option>
            <option value="10">National laissez-passer</option>
            <option value="14">Official passport</option>
            <option value="01">Ordinary passport</option>
            <option value="08">Passport of foreigners</option>
            <option value="03">Protection passport</option>
            <option value="12">
              Refugee Travel Document (Geneva Convention)
            </option>
            <option value="16">Seaman’s book</option>
            <option value="05">Service passport</option>
            <option value="07">Special passport</option>
            <option value="11">UN laissez-passer</option>
          </select>
        </div>
        <div
          style={styles.input}
          onDoubleClick={() => (store.passport_no = prompt("Enter new value"))}
        >
          <b>Passport No:</b> {store.passport_no}
        </div>
        <div
          style={styles.input}
          onDoubleClick={() =>
            (store.ppt_issue_date = prompt("Enter new value YYYY-MM-DD"))
          }
        >
          <b>Passport issue date:</b> {store.ppt_issue_date}
        </div>
        <div
          style={styles.input}
          onDoubleClick={() =>
            (store.ppt_expiry_date = prompt("Enter new value YYYY-MM-DD"))
          }
        >
          <b>Passport expiry date:</b> {store.ppt_expiry_date}
        </div>
        <div
          style={styles.input}
          onDoubleClick={() =>
            (store.ppt_issue_palace = prompt("Enter new value"))
          }
        >
          <b>Passport issue palace:</b> {store.ppt_issue_palace}
        </div>
        <div style={styles.input}>
          <b>Juridiction:</b>
          <select
            style={{ width: "100%" }}
            placeholder="juridiction"
            value={store.juridiction}
            onChange={e => (store.juridiction = e.target.value)}
          >
            <option value="14#Adrar#9">Adrar</option>
            <option value="14#A�n Temouchent Y Relizane#9">
              Aïn Temouchent Y Relizane
            </option>
            <option value="15#Ain-Defla#10">Ain-Defla</option>
            <option value="15#Algiers#10">Algiers</option>
            <option value="15#Annaba#10">Annaba</option>
            <option value="15#Batna#10">Batna</option>
            <option value="14#B�char#9">Béchar</option>
            <option value="15#B�jaia#10">Béjaia</option>
            <option value="15#Biskra#10">Biskra</option>
            <option value="15#Blida#10">Blida</option>
            <option value="15#Bordj-Bou-Arr�ridj#10">Bordj-Bou-Arréridj</option>
            <option value="15#Bouira#10">Bouira</option>
            <option value="15#Boumerd�s#10">Boumerdés</option>
            <option value="14#Chlef#9">Chlef</option>
            <option value="15#Constantine#10">Constantine</option>
            <option value="15#Djelfa#10">Djelfa</option>
            <option value="14#El Bayadh#9">El Bayadh</option>
            <option value="15#El Oued, El Tarf#10">El Oued, El Tarf</option>
            <option value="15#Gharda�a#10">Ghardaïa</option>
            <option value="15#Guelma#10">Guelma</option>
            <option value="15#Illizi#10">Illizi</option>
            <option value="15#Jijel#10">Jijel</option>
            <option value="15#Khenchela#10">Khenchela</option>
            <option value="15#Laghouart#10">Laghouart</option>
            <option value="15#M'sila#10">M'sila</option>
            <option value="14#Mascara#9">Mascara</option>
            <option value="15#M�d�a#10">Médéa</option>
            <option value="15#Mila#10">Mila</option>
            <option value="14#Mostaganem#9">Mostaganem</option>
            <option value="14#Na�ma#9">Naâma</option>
            <option value="14#Oran#9">Oran</option>
            <option value="15#Ouargla#10">Ouargla</option>
            <option value="15#Oum El Bouaghi#10">Oum El Bouaghi</option>
            <option value="14#Sa�da#9">Saïda</option>
            <option value="15#S�tif#10">Sétif</option>
            <option value="14#Sidi Bel-Abbes#9">Sidi Bel-Abbes</option>
            <option value="15#Skikda#10">Skikda</option>
            <option value="15#Souk Ahras#10">Souk Ahras</option>
            <option value="15#Tamanrasset#10">Tamanrasset</option>
            <option value="15#Tebessa#10">Tebessa</option>
            <option value="14#Tiaret#9">Tiaret</option>
            <option value="15#Tindouf#10">Tindouf</option>
            <option value="15#Tipaza#10">Tipaza</option>
            <option value="14#Tissemsilt#9">Tissemsilt</option>
            <option value="15#Tizi-Ouzou#10">Tizi-Ouzou</option>
            <option value="14#Tlemcen#9">Tlemcen</option>
          </select>
        </div>
        <div
          style={styles.input}
          onDoubleClick={() => (store.visa_no = prompt("Enter new value"))}
        >
          <b>Visa No:</b> {store.visa_no}
        </div>
        <div style={styles.input}>
          <b>Visa type:</b>
          <select
            style={{ width: "100%" }}
            value={store.visa_type}
            onChange={e => (store.visa_type = e.target.value)}
            placeholder="VisaTypeId"
          >
            <option value="207">Tourism</option>
            <option value="208">Business</option>
            <option value="209">Students /Study</option>
            <option value="210">Transit</option>
            <option value="211">Sport/Culture</option>
            <option value="212">Medical</option>
            <option value="213">Family</option>
            <option value="214">Mission</option>
          </select>
        </div>
      </div>
    );
  }
}
Table = observer(Table);

class App extends Component {
  componentDidMount() {
    addStyleString(`
      body{
        position: relative;
      }
    `);
    const storeLocalStorageText = localStorage.getItem("appStore");
    if (storeLocalStorageText) {
      let storeLocalStorage = JSON.parse(storeLocalStorageText);
      appStore.isLoading = storeLocalStorage.isLoading;
      appStore.isLoggedin = storeLocalStorage.isLoggedin;
      appStore.fill_auto = storeLocalStorage.fill_auto;
      appStore.start = storeLocalStorage.start;
      appStore.success = storeLocalStorage.success;
      appStore.first_name = storeLocalStorage.first_name;
      appStore.last_name = storeLocalStorage.last_name;
      appStore.date_of_birth = storeLocalStorage.date_of_birth;
      appStore.email = storeLocalStorage.email;
      appStore.phone_code = storeLocalStorage.phone_code;
      appStore.phone = storeLocalStorage.phone;
      appStore.passport_type = storeLocalStorage.passport_type;
      appStore.passport_no = storeLocalStorage.passport_no;
      appStore.ppt_issue_date = storeLocalStorage.ppt_issue_date;
      appStore.ppt_expiry_date = storeLocalStorage.ppt_expiry_date;
      appStore.ppt_issue_palace = storeLocalStorage.ppt_issue_palace;
      appStore.juridiction = storeLocalStorage.juridiction;
      appStore.visa_no = storeLocalStorage.visa_no;
      appStore.visa_type = storeLocalStorage.visa_type;
      appStore.veryfication_code = storeLocalStorage.veryfication_code;
    }
    if (appStore.start) {
      this.init();
    }
  }
  init = () => {
    $(".popupBG-app").hide();
    $("#IDBodyPanelapp").hide();
    var tokenvalue = $("#csrftokenvalue").val();
    if (tokenvalue === undefined) {
      appStore.message = "Maybe thé site closed now !";
      reloadSetTimeout();
    } else {
      var email = appStore.email;
      var jurisId = appStore.juridiction.split("#");
      var phoneCode = appStore.phone_code;
      var mobileNo = appStore.phone;
      var visa = appStore.visa_no;
      document.getElementById("email").value = email;
      document.getElementById("juridiction").value = appStore.juridiction;
      document.getElementById("phone_code").value = phoneCode;
      document.getElementById("phone").value = mobileNo;
      document.getElementById("visa_no").value = visa;
      if (mobileNo != "" && phoneCode != "" && jurisId[2] != "") {
        $.ajax({
          type: "POST",
          data:
            "gofor=send_mail&email=" +
            email +
            "&phone_code=" +
            phoneCode +
            "&phone_no=" +
            mobileNo +
            "&center_id=" +
            jurisId[2] +
            "&visa=" +
            visa +
            "&token=" +
            tokenvalue,
          url: "ajax.php",
          success: function(response) {
            if (response.trim() == "full") {
              appStore.message = "Appointment dates are not available.";
              reloadSetTimeout();
              $("#reponse_div").html("Appointment dates are not available.");
            } else if (response.trim() == "fail") {
              appStore.message =
                "You have already booked appointment with this phone. Please try with another number.";
              reloadSetTimeout();
              $("#reponse_div").html(
                "You have already booked appointment with this phone. Please try with another number."
              );
            } else if (response.trim() == "same") {
              appStore.message = "Please used last sent verification code.";
              appStore.success = true;
              $("#reponse_div").html(
                "Please used last sent verification code."
              );
              window.open(
                "https://www.youtube.com/watch?v=BQI1Fvp6rBw",
                "_blank"
              );
            } else if (response.trim() == "error") {
              appStore.message =
                "Please check your phone number and country code for phone.";
              reloadSetTimeout();
              $("#reponse_div").html(
                "Please check your phone number and country code for phone."
              );
            } else if (response.trim() == "CSRF Token validation Failed") {
              appStore.message =
                "Token validation Failed! Please refresh your page.";
              reloadSetTimeout();
              $("#reponse_div").html(
                "Token validation Failed! Please refresh your page."
              );
            } else if (response.trim() == "pass") {
              appStore.message = "Verification code sent to your phone.";
              appStore.success = true;
              $("#reponse_div").html("Verification code sent to your phone.");
              $(".btn-check-otp").attr("disabled", "disabled");
              window.open(
                "https://www.youtube.com/watch?v=BQI1Fvp6rBw",
                "_blank"
              );
            } else {
              reloadSetTimeout();
            }
          }
        });
      } else {
        appStore.message = "error while trying to fetch !!";
        reloadSetTimeout();
      }
    }
  };
  _onStart = () => {
    if (appStore.start) {
      // do to stope
      appStore.start = false;
    } else {
      appStore.start = true;
      this.init();
    }
  };
  _fill = () => {
    var dd = document.getElementsByClassName("col-sm-8 container");
    if (dd !== null && dd.length > 0) {
      var d = dd[0];
      var inner = d.innerHTML;
      var i = inner.search("available_dates");
      if (i !== -1) {
        var s = "";
        for (let x = i; i < inner.length; x++) {
          if (inner[x] === "]") {
            break;
          }
          s += inner[x];
        }
        s += "]";
        s = s.split("=")[1];
        var date = eval(s)[0];
        document.getElementById("app_date").value = date
          .split("-")
          .reverse()
          .join("-");
        document.getElementById("app_time").value = "10:00 - 10:10";
        document.getElementById("VisaTypeId").value = appStore.visa_type;
        document.getElementById("first_name").value = appStore.first_name;
        document.getElementById("last_name").value = appStore.last_name;
        document.getElementById("dateOfBirth").value = appStore.date_of_birth;
        document.getElementById("phone_code").value = appStore.phone_code;
        document.getElementById("phone").value = appStore.phone;
        document.getElementById("nationalityId").value = appStore.nationality;
        document.getElementById("passportType").value = appStore.passport_type;
        document.getElementById("passport_no").value = appStore.passport_no;
        document.getElementById("pptIssueDate").value = appStore.ppt_issue_date;
        document.getElementById("pptExpiryDate").value =
          appStore.ppt_expiry_date;
        document.getElementById("pptIssuePalace").value =
          appStore.ppt_issue_palace;
        appStore.message = "Fill data  - SUCCESS";
      } else {
        appStore.message = "Fill data  - ERROR";
      }
    }
  };
  _codeChange = e => {
    appStore.veryfication_code = e.target.value;
    appStore.start = false;
  };

  render() {
    return (
      <div
        style={{
          position: "fixed",
          zIndex: 100000,
          right: 10,
          top: 10,
          width: 350,
          backgroundColor: "#f1f1f1",
          border: appStore.success
            ? "3px solid lightgreen"
            : "3px solid orange",
          borderRadius: 10,
          padding: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
        id="reactAppDiv"
      >
        <input
          style={{
            padding: 3,
            fontSize: 14
          }}
          onKeyPress={e => {
            if (e.key === "Enter") {
              if (document.getElementById("otpvr") !== null) {
                document.getElementById("email").value = appStore.email;
                document.getElementById("juridiction").value =
                  appStore.juridiction;
                document.getElementById("phone_code").value =
                  appStore.phone_code;
                document.getElementById("phone").value = appStore.phone;
                document.getElementById("visa_no").value = appStore.visa_no;
                document.getElementById("otpvr").value =
                  appStore.veryfication_code;
                $("#recaptcha-token").click();
              } else {
                appStore.message = "veryfication code input field not found !";
              }
            }
          }}
          type="text"
          placeholder="Put the veryfication code and press Enter "
          value={appStore.veryfication_code}
          onChange={this._codeChange}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <button style={{ flex: 1 }} onClick={this._fill}>
            Fill data
          </button>
          <button
            style={{
              flex: 1,
              backgroundColor: appStore.start ? "#d8e647" : "#eaaeae"
            }}
            onClick={this._onStart}
          >
            {appStore.start ? "Click to stop" : "Click to start"}
          </button>
          <button
            style={{ flex: 1 }}
            onClick={() => {
              localStorage.clear();
              document.location.reload();
            }}
          >
            Default values
          </button>
        </div>
        <hr style={{ width: "100%" }} />
        <span style={{ alignSelf: "center" }}>{appStore.message}</span>
        <hr style={{ width: "100%" }} />
        <span
          onClick={() => {
            appStore.start = false;
            appStore.showTable = !appStore.showTable;
          }}
          style={{
            alignSelf: "flex-end",
            cursor: "pointer",
            textDecoration: "underline"
          }}
        >
          {appStore.showTable
            ? "Hide your informations"
            : "Show your informations"}
        </span>
        {appStore.showTable === true && <Table store={appStore} />}
      </div>
    );
  }
}
App = observer(App);
export default App;
