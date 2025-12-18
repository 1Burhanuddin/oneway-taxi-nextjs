"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

export default function TermsAndConditions() {
    return (
        <div className="min-h-screen text-white relative overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
                }}
            />

            <Header />

            <div className="relative z-10 container mx-auto px-4 pt-32 pb-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                        Terms and Conditions
                    </h1>

                    <Card className="p-8 rounded-3xl border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl space-y-8 text-white/80 leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold text-yellow-400 mb-4">TERMS AND CONDITIONS</h2>
                            <p className="mb-4">
                                The terms "We" / "Us" / "Our"/” Company” individually and collectively refer to onewaytaxicabs.com and the terms "You" /"Your" / "Yourself" refer to the users.
                            </p>
                            <p className="mb-4">
                                This page states the Terms and Conditions under which you (Visitor) may visit this website (“Website”). Please read this page carefully. If you do not accept the Terms and Conditions stated here, we would request you to exit this site. The business, any of its business divisions and / or its subsidiaries, associate companies or subsidiaries to subsidiaries or such other investment companies (in India or abroad) reserve their respective rights to revise these Terms and Conditions at any time by updating this posting. You should visit this page periodically to re-appraise yourself of the Terms and Conditions, because they are binding on all users of this Website.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-yellow-400 mb-4">USE OF CONTENT</h2>
                            <p>
                                All logos, brands, marks headings, labels, names, signatures, numerals, shapes or any combinations thereof, appearing in this site, except as otherwise noted, are properties either owned, or used under licence, by the business and / or its associate entities who feature on this Website. The use of these properties or any other content on this site, except as provided in these terms and conditions or in the site content, is strictly prohibited.
                                You may not sell or modify the content of this Website or reproduce, display, publicly perform, distribute, or otherwise use the materials in any way for any public or commercial purpose without the respective organisations or entity’s written permission.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-yellow-400 mb-4">ACCEPTABLE WEBSITE USE</h2>
                            <h3 className="text-xl font-semibold text-white mb-2">(A) Security Rules</h3>
                            <p className="mb-4">
                                Visitors are prohibited from violating or attempting to violate the security of the Web site, including, without limitation, (1) accessing data not intended for such user or logging into a server or account which the user is not authorised to access, (2) attempting to probe, scan or test the vulnerability of a system or network or to breach security or authentication measures without proper authorisation, (3) attempting to interfere with service to any user, host or network, including, without limitation, via means of submitting a virus or "Trojan horse" to the Website, overloading, "flooding", "mail bombing" or "crashing", or (4) sending unsolicited electronic mail, including promotions and/or advertising of products or services. Violations of system or network security may result in civil or criminal liability. The business and / or its associate entities will have the right to investigate occurrences that they suspect as involving such violations and will have the right to involve, and cooperate with, law enforcement authorities in prosecuting users who are involved in such violations.
                            </p>
                            <h3 className="text-xl font-semibold text-white mb-2">(B) General Rules</h3>
                            <p>
                                Visitors may not use the Web Site in order to transmit, distribute, store or destroy material (a) that could constitute or encourage conduct that would be considered a criminal offence or violate any applicable law or regulation, (b) in a manner that will infringe the copyright, trademark, trade secret or other intellectual property rights of others or violate the privacy or publicity of other personal rights of others, or (c) that is libellous, defamatory, pornographic, profane, obscene, threatening, abusive or hateful.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-yellow-400 mb-4">LIABILITY</h2>
                            <p className="mb-4">
                                User agrees that neither Company nor its group companies, directors, officers or employee shall be liable for any direct or/and indirect or/and incidental or/and special or/and consequential or/and exemplary damages, resulting from the use or/and the inability to use the service or/and for cost of procurement of substitute goods or/and services or resulting from any goods or/and data or/and information or/and services purchased or/and obtained or/and messages received or/and transactions entered into through or/and from the service or/and resulting from unauthorized access to or/and alteration of user's transmissions or/and data or/and arising from any other matter relating to the service, including but not limited to, damages for loss of profits or/and use or/and data or other intangible, even if Company has been advised of the possibility of such damages.
                            </p>
                            <p className="mb-4">
                                User further agrees that Company shall not be liable for any damages arising from interruption, suspension or termination of service, including but not limited to direct or/and indirect or/and incidental or/and special consequential or/and exemplary damages, whether such interruption or/and suspension or/and termination was justified or not, negligent or intentional, inadvertent or advertent.
                            </p>
                            <p>
                                User agrees that Company shall not be responsible or liable to user, or anyone, for the statements or conduct of any third party of the service. In sum, in no event shall Company's total liability to the User for all damages or/and losses or/and causes of action exceed the amount paid by the User to Company, if any, that is related to the cause of action.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-yellow-400 mb-4">DISCLAIMER OF CONSEQUENTIAL DAMAGES</h2>
                            <p className="mb-4">
                                In no event shall Company or any parties, organizations or entities associated with the corporate brand name us or otherwise, mentioned at this Website be liable for any damages whatsoever (including, without limitations, incidental and consequential damages, lost profits, or damage to computer hardware or loss of data information or business interruption) resulting from the use or inability to use the Website and the Website material, whether based on warranty, contract, tort, or any other legal theory, and whether or not, such organization or entities were advised of the possibility of such damages.
                            </p>
                            <p>
                                Our focus is complete customer satisfaction. In the event, if you are displeased with the services provided, we will refund back the money, provided the reasons are genuine and proved after investigation. Please read the fine prints of each deal before buying it, it provides all the details about the services or the product you purchase.
                            </p>
                        </section>
                    </Card>
                </div>
            </div>

            <Footer />
        </div>
    );
}
