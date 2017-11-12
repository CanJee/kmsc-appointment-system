Accounts.emailTemplates.siteName = "Kanjee Medical Skin Care";
Accounts.emailTemplates.from     = "Kanjee Medical Skin Care <admin@drkanjee.com>";

SSR.compileTemplate('htmlEmail', Assets.getText('htmlEmail.html'));

Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "[KMSC] Verify Your Email Address";
  },
  html( user, url ) {
    var emailData = {
      emailAddress: user.emails[0].address,
      name: user.profile.name,
      urlWithoutHash: url.replace( '#/', '' ),
      supportEmail: "info@drkanjee.com",
    };
    return SSR.render('htmlEmail', emailData)
  }
};
