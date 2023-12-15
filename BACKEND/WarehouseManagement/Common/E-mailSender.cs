using System.Net.Mail;
using System.Net.Security;
using System.Net;
using System.Security.Cryptography.X509Certificates;
using WarehouseManagement.BindingModel;

namespace WarehouseManagement.Common
{
    public static class E_mailSender
    {

        public static void SendEmail(SendMailModel mailContent)
        {
            MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com", 587);//Server SMTP
            SmtpServer.EnableSsl = true;
            SmtpServer.Timeout = 10000;
            SmtpServer.DeliveryMethod = SmtpDeliveryMethod.Network;
            SmtpServer.UseDefaultCredentials = false;

            mail.From = new MailAddress("wrhsmanagement@gmail.com");
            mail.To.Add(new MailAddress(mailContent.Email));//Adres na który e-mail jest przesyłany

            mail.Subject = mailContent.Subject;//Tytuł e-mailu
            mail.Body = mailContent.Body;//Treść e-mailu


            SmtpServer.Credentials = new NetworkCredential("wrhsmanagement@gmail.com", "tgmi lmyu dsui bios");//Dane do servera SMTP
            ServicePointManager.ServerCertificateValidationCallback = delegate (object s, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors)
            {
                return true;
            };

            mail.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;
            SmtpServer.Send(mail);
        }
    }
}
