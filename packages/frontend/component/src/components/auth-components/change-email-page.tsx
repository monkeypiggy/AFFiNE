import { useAFFiNEI18N } from '@affine/i18n/hooks';
import { useCallback, useState } from 'react';

import { Button } from '../../ui/button';
import { AuthInput } from './auth-input';
import { AuthPageContainer } from './auth-page-container';
import { emailRegex } from './utils';

export const ChangeEmailPage = ({
  onChangeEmail: propsOnChangeEmail,
}: {
  onChangeEmail: (email: string) => Promise<boolean>;
  onOpenAffine: () => void;
}) => {
  const t = useAFFiNEI18N();
  const [hasSetUp, setHasSetUp] = useState(false);
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [loading, setLoading] = useState(false);
  const onContinue = useCallback(
    () =>
      void (async () => {
        if (!emailRegex.test(email)) {
          setIsValidEmail(false);
          return;
        }
        setIsValidEmail(true);
        setLoading(true);

        const setup = await propsOnChangeEmail(email);

        setLoading(false);
        setHasSetUp(setup);
      })(),
    [email, propsOnChangeEmail]
  );
  const onEmailChange = useCallback((value: string) => {
    setEmail(value);
  }, []);
  return (
    <AuthPageContainer
      title={t['com.affine.auth.change.email.page.title']()}
      subtitle={t['com.affine.auth.change.email.page.subtitle']()}
    >
      <>
        <AuthInput
          width={320}
          label={t['com.affine.settings.email']()}
          placeholder={t['com.affine.auth.sign.email.placeholder']()}
          value={email}
          onChange={onEmailChange}
          error={!isValidEmail}
          errorHint={
            isValidEmail ? '' : t['com.affine.auth.sign.email.error']()
          }
          onEnter={onContinue}
          disabled={hasSetUp}
        />
        <Button
          type="primary"
          size="large"
          onClick={onContinue}
          loading={loading}
          disabled={hasSetUp}
        >
          {t['com.affine.auth.set.email.save']()}
        </Button>
      </>
    </AuthPageContainer>
  );
};
