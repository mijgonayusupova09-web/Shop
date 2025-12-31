import { Input, Button, Card } from "antd";
import img1 from "../assets/icons-phone.png";
const { TextArea } = Input;

export const Contact = () => {
  return (
    <div className="w-[90%] m-auto mt-[60px]">
      <div className="flex flex-col lg:flex-row justify-between gap-8 mt-12">
        <Card className="w-full lg:w-[300px] shadow-lg rounded-lg p-6">
          <div className="flex gap-2 items-center">
            <img src={img1} alt="Call" className="w-6 h-6" />
            <h2 className="text-lg font-semibold">Call To Us</h2>
          </div>
          <p className="text-sm mt-2">We are available 24/7, 7 days a week.</p>
          <p className="text-sm mt-1">Phone: +8801611112222</p>

          <hr className="my-4 border-gray-300" />

          <div className="flex gap-2 items-center">
            <img src={img1} alt="Email" className="w-6 h-6" />
            <h2 className="text-lg font-semibold">Write To Us</h2>
          </div>
          <p className="text-sm mt-2">
            Fill out our form and we will contact you within 24 hours.
          </p>
          <p className="text-sm mt-1">Emails: customer@exclusive.com</p>
          <p className="text-sm mt-1">Emails: support@exclusive.com</p>
        </Card>
        <Card className="w-full lg:w-[800px] shadow-lg rounded-lg p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <Input placeholder="Name" />
            <Input placeholder="Email" type="email" />
            <Input placeholder="Phone" type="tel" />
          </div>

          <TextArea
            rows={6}
            placeholder="Your Message"
            className="mt-4"
          />

          <Button
            type="primary"
            className="mt-4 float-right bg-red-600 hover:bg-red-700"
          >
            Send Message
          </Button>
        </Card>
      </div>
    </div>
  );
};
