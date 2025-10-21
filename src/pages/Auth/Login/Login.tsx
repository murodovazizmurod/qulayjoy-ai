import { useEffect, useState } from 'react';
import { IconEye, IconEyeOff, IconUser, IconLock, IconArrowLeft } from '@tabler/icons-react';

import * as AuthModules from '@/modules/auth';

import * as Fields from '@/shared/containers/fields';

import Button from '@/shared/components/Button';

import styles from './Login.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { storage } from '@/core/services';
import Spacer from '@/shared/components/Spacer';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('');
  const [showPassword, setShowPassword] = useState(false);
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
              <div className={styles.formTitle}>{t('action_login')}</div>
              <div className={styles.formSubtitle}>
                {t('welcome_back', { defaultValue: 'Welcome back! Please sign in to your account.' })}
              </div>
            </div>

            <AuthModules.Forms.Login>
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

                    <div className={styles.forgotPassword}>
                      <NavLink to="/auth/forgot-password" className={styles.forgotLink}>
                        {t('forgot_password', { defaultValue: 'Forgot your password?' })}
                      </NavLink>
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
                      {isLoading ? t('signing_in', { defaultValue: 'Signing in...' }) : t('action_login')}
                    </Button>

                    <div className={styles.divider}>
                      <span className={styles.dividerText}>
                        {t('or', { defaultValue: 'or' })}
                      </span>
                    </div>

                    <NavLink to="/auth/register" className={styles.formLink}>
                      <span className={styles.linkText}>
                        {t('dont_have_account', { defaultValue: "Don't have an account?" })}
                      </span>
                      <span className={styles.linkAction}>
                        {t('action_register')}
                      </span>
                    </NavLink>
                  </div>
                );
              }}
            </AuthModules.Forms.Login>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
