import { useEffect, useState } from 'react';
import { IconEye, IconEyeOff, IconUser, IconLock, IconPhone, IconArrowLeft, IconUserCheck } from '@tabler/icons-react';

import * as AuthModules from '@/modules/auth';

import * as Fields from '@/shared/containers/fields';

import Button from '@/shared/components/Button';

import styles from './Register.module.scss';
import { useNavigate, NavLink } from 'react-router-dom';
import { storage } from '@/core/services';
import Spacer from '@/shared/components/Spacer';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const token = storage.local.get('accessToken');

  useEffect(() => {
    if (token && token.length > 3) navigate('/');
  }, [token]);

  const handleLoadingChange = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperLeft}>
        <main className={styles.main}>
          <div className={styles.form}>
            <div className={styles.formHeader}>
              <button 
                className={styles.backButton}
                onClick={() => navigate('/')}
                aria-label="Go back"
              >
                <IconArrowLeft size={20} />
              </button>
              <div className={styles.formTitle}>{t('action_register', { ns: 'common' })}</div>
              <div className={styles.formSubtitle}>
                {t('create_account', { defaultValue: 'Create your account to get started.' })}
              </div>
            </div>

            <AuthModules.Forms.Register>
              {({ isLoading: formLoading }) => {
                handleLoadingChange(formLoading || false);
                
                return (
                  <div className={styles.formInner}>
                    <div className={styles.inputGroup}>
                      <div className={styles.inputWrapper}>
                        <IconUser className={styles.inputIcon} size={20} />
                        <Fields.Text 
                          placeholder={t('username', { ns: 'profile' })} 
                          size="sm" 
                          name="userName"
                          className={styles.inputField}
                        />
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <div className={styles.inputWrapper}>
                        <IconPhone className={styles.inputIcon} size={20} />
                        <Fields.Text 
                          placeholder={t('phone_number', { ns: 'profile' })} 
                          size="sm" 
                          name="phone"
                          className={styles.inputField}
                        />
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <div className={styles.inputWrapper}>
                        <IconUserCheck className={styles.inputIcon} size={20} />
                        <Fields.Select
                          label={t('role', { ns: 'profile' })}
                          placeholder={t('role', { ns: 'profile' })}
                          size="sm"
                          name="role"
                          className={styles.inputField}
                          data={[
                            { label: t('renter', { defaultValue: 'Renter' }), value: 'renter' },
                            { label: t('landlord', { defaultValue: 'Landlord' }), value: 'landlord' }
                          ]}
                        />
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <div className={styles.inputWrapper}>
                        <IconLock className={styles.inputIcon} size={20} />
                        <Fields.Password 
                          placeholder={t('password', { ns: 'profile' })} 
                          size="sm" 
                          name="password"
                          className={styles.inputField}
                        />
                        <button
                          type="button"
                          className={styles.passwordToggle}
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                        </button>
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <div className={styles.inputWrapper}>
                        <IconLock className={styles.inputIcon} size={20} />
                        <Fields.Password
                          placeholder={t('confirm_password', { ns: 'profile' })}
                          size="sm"
                          name="confirmPassword"
                          className={styles.inputField}
                        />
                        <button
                          type="button"
                          className={styles.passwordToggle}
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        >
                          {showConfirmPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                        </button>
                      </div>
                    </div>

                    <div className={styles.passwordRequirements}>
                      <div className={styles.requirementTitle}>
                        {t('password_requirements', { defaultValue: 'Password must contain:' })}
                      </div>
                      <ul className={styles.requirementList}>
                        <li>{t('min_8_chars', { defaultValue: 'At least 8 characters' })}</li>
                        <li>{t('one_uppercase', { defaultValue: 'One uppercase letter' })}</li>
                        <li>{t('one_number', { defaultValue: 'One number' })}</li>
                      </ul>
                    </div>

                    <Spacer size={4} />

                    <Button 
                      full 
                      size="md" 
                      disabled={isLoading} 
                      htmlType="submit" 
                      variant="primary"
                      className={styles.submitButton}
                      loading={isLoading}
                    >
                      {isLoading ? t('creating_account', { defaultValue: 'Creating account...' }) : t('action_register', { ns: 'common' })}
                    </Button>

                    <div className={styles.divider}>
                      <span className={styles.dividerText}>
                        {t('or', { defaultValue: 'or' })}
                      </span>
                    </div>

                    <NavLink to="/auth/login" className={styles.formLink}>
                      <span className={styles.linkText}>
                        {t('already_have_account', { defaultValue: 'Already have an account?' })}
                      </span>
                      <span className={styles.linkAction}>
                        {t('action_login')}
                      </span>
                    </NavLink>
                  </div>
                );
              }}
            </AuthModules.Forms.Register>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Register;
