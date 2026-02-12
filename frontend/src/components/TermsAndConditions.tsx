import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TermsAndConditionsProps {
    accepted: boolean;
    onChange: (accepted: boolean) => void;
    error?: string;
    userType?: 'student' | 'mentor';
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
    accepted,
    onChange,
    error,
    userType = 'student'
}) => {
    const [expanded, setExpanded] = useState(false);

    const studentTerms = `
TERMS AND CONDITIONS FOR STUDENTS

1. ACCOUNT CREATION AND USAGE
   - You must be at least 16 years old to create an account
   - You are responsible for maintaining the confidentiality of your login credentials
   - You agree to use the platform only for educational purposes
   - One account per person; sharing accounts is strictly prohibited

2. QUERY SUBMISSION
   - Questions must be relevant to your academic or professional development
   - No spam, harassment, or inappropriate content is allowed
   - Questions should be in English or clearly specified language
   - You retain ownership of your submitted queries
   - The platform may use anonymous query data for improvement purposes

3. MENTOR INTERACTIONS
   - Mentors are volunteers providing guidance; their advice is not professional service
   - You agree to be respectful and professional with mentors
   - Any abusive or harassing behavior will result in account suspension
   - Mentors' contact information is for academic purposes only

4. INTELLECTUAL PROPERTY
   - Content provided by mentors is educational material
   - You may not reproduce or distribute mentor responses without permission
   - The platform retains right to use anonymized content

5. LIMITATION OF LIABILITY
   - The platform is provided "as-is" without warranties
   - We are not liable for losses or damages arising from mentor advice
   - Users are responsible for fact-checking and verifying information

6. DATA PRIVACY
   - Your personal data is handled as per our privacy policy
   - Your email will not be shared with third parties without consent
   - We may contact you via email regarding your account

7. TERMINATION
   - We reserve the right to suspend accounts violating these terms
   - You may delete your account anytime

By checking this box, you agree to all terms and conditions listed above.
    `;

    const mentorTerms = `
TERMS AND CONDITIONS FOR MENTORS

1. MENTOR RESPONSIBILITIES
   - You must be at least 18 years old and have relevant expertise
   - You agree to provide respectful, helpful guidance to students
   - Your advice should be accurate and well-researched
   - You will respond to queries in a timely manner
   - You acknowledge that you are a volunteer and receive no compensation

2. CONTENT AND ETHICS
   - All responses must be original or properly attributed
   - You cannot promote commercial services or products
   - Your responses must adhere to academic integrity standards
   - No harassment, discrimination, or inappropriate content
   - You agree to maintain professional conduct at all times

3. STUDENT INTERACTIONS
   - You will not request personal information beyond what's needed
   - You will not share student contact information
   - Student queries are confidential
   - You agree to maintain appropriate mentor-mentee boundaries
   - You will not solicit external communication outside the platform

4. INTELLECTUAL PROPERTY
   - You retain ownership of your original guidance content
   - The platform may use anonymized responses for educational purposes
   - You may not reproduce copyrighted material without permission

5. CODE OF CONDUCT
   - You represent yourself truthfully in your profile
   - Your expertise claims will be verified by the platform
   - You commit to non-discrimination and inclusion
   - You will promptly report any inappropriate student behavior

6. SUSPENSION AND REMOVAL
   - The platform may suspend your account for terms violation
   - Repeated violations may result in permanent removal
   - You may deactivate your account anytime

7. DATA PRIVACY
   - Your personal data is handled as per our privacy policy
   - Your profile information helps students identify suitable mentors
   - You may update or remove profile information anytime

8. LIABILITY
   - You are solely responsible for the advice you provide
   - The platform does not endorse or verify mentor qualifications
   - You indemnify the platform against claims arising from your guidance

By checking this box, you agree to all terms and conditions listed above.
    `;

    const termsContent = userType === 'mentor' ? mentorTerms : studentTerms;

    return (
        <div className="space-y-3">
            {/* Terms Box */}
            <div className="border-2 border-gray-200 rounded-xl bg-white/50 overflow-hidden">
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    type="button"
                >
                    <h3 className="text-sm font-semibold text-text-main">
                        Terms and Conditions
                    </h3>
                    {expanded ? (
                        <ChevronUp size={20} className="text-gray-600" />
                    ) : (
                        <ChevronDown size={20} className="text-gray-600" />
                    )}
                </button>

                {expanded && (
                    <div className="border-t border-gray-200 px-4 py-3 max-h-64 overflow-y-auto bg-gray-50">
                        <p className="text-xs text-text-main whitespace-pre-wrap leading-relaxed font-body">
                            {termsContent}
                        </p>
                    </div>
                )}
            </div>

            {/* Acceptance Checkbox */}
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <input
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => onChange(e.target.checked)}
                    id="terms-checkbox"
                    className="w-5 h-5 mt-0.5 cursor-pointer accent-blue-600 rounded"
                />
                <label htmlFor="terms-checkbox" className="text-sm text-text-main font-medium cursor-pointer flex-1">
                    I have read and agree to the Terms and Conditions
                </label>
            </div>

            {error && (
                <p className="text-danger text-xs ml-1 font-medium">
                    {error}
                </p>
            )}
        </div>
    );
};

export default TermsAndConditions;
