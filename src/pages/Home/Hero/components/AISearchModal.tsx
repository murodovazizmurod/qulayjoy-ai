import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Modal, 
  TextInput, 
  Button, 
  Group, 
  Text, 
  Alert, 
  Stack,
  Divider,
  Badge,
  Card,
  ScrollArea,
  ActionIcon,
  Loader,
  Box,
  Image,
  Flex,
  Avatar,
  Anchor
} from '@mantine/core';
import { 
  IconSearch, 
  IconRobot, 
  IconInfoCircle, 
  IconX, 
  IconSparkles, 
  IconMapPin, 
  IconClock, 
  IconCurrencyDollar, 
  IconHome, 
  IconBed, 
  IconBath, 
  IconRuler, 
  IconBuilding, 
  IconCalendar, 
  IconPhone, 
  IconExternalLink 
} from '@tabler/icons-react';

import { useAISearch } from '@/modules/apartmentSearch/hooks';
import CustomButton from '@/shared/components/Button';
import ApartmentDetailModal from '../../List/components/CardModal/Modal';
import { useBackendErrorTranslation } from '@/hooks/useBackendErrorTranslation';

interface AISearchModalProps {
  opened: boolean;
  onClose: () => void;
  onResults?: (results: any) => void;
  onError?: (error: string) => void;
}

const AISearchModal = ({ opened, onClose, onResults, onError }: AISearchModalProps) => {
  const { t } = useTranslation();
  const { translateBackendError } = useBackendErrorTranslation();
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState<any>(null);
  const [isApartmentModalOpen, setIsApartmentModalOpen] = useState(false);

  const { data: aiResults, isLoading, error } = useAISearch({
    query,
    enabled: isSearching && query.trim().length > 0
  });

  const handleSearch = () => {
    if (query.trim().length > 0) {
      setIsSearching(true);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClose = () => {
    setQuery('');
    setIsSearching(false);
    onClose();
  };

  const translateSuggestions = (suggestions: string[]) => {
    const suggestionMap: { [key: string]: string } = {
      'Specify a desired price range.': 'specify_price_range',
      'Indicate the number of rooms you need.': 'indicate_rooms',
      'Specify a district.': 'specify_district',
      'Add more amenities.': 'add_amenities',
      'Specify a metro station.': 'specify_metro_station',
      'Add walking distance preference.': 'add_walking_distance',
      'Specify desired price range.': 'specify_price_range',
      'Indicate a budget range (price_min and price_max).': 'specify_price_range',
      'Specify the number of rooms needed.': 'indicate_rooms',
      'Specify a desired district.': 'specify_district',
      'Add specific amenities.': 'add_amenities',
      'Specify a specific metro station.': 'specify_metro_station',
      'Specify walking distance preference.': 'add_walking_distance'
    };

    return suggestions.map(suggestion => {
      const trimmedSuggestion = suggestion.trim();
      const translationKey = suggestionMap[trimmedSuggestion];
      
      if (translationKey) {
        return t(`ai_suggestions.${translationKey}`, { ns: 'home', defaultValue: trimmedSuggestion });
      }
      
      // Fallback: return original suggestion if no translation found
      return trimmedSuggestion;
    });
  };

  const renderApartmentPreview = (apartment: any) => {
    const coverImageRaw = apartment.images?.find((img: any) => img.is_cover)?.image || apartment.images?.[0]?.image;
    // Ensure image URL uses the correct base URL
    const coverImage = coverImageRaw ? (
      coverImageRaw.startsWith('http') ? coverImageRaw : `https://api.qulayjoy.uz${coverImageRaw}`
    ) : null;
    
    return (
      <Card 
        key={apartment.id} 
        shadow="sm" 
        padding="md" 
        radius="md" 
        withBorder
        style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
        onClick={() => {
          // Open apartment detail modal - ensure data is properly formatted
          const formattedApartment = {
            ...apartment,
            // Ensure amenities have proper icon_class values
            amenities: apartment.amenities?.map((amenity: any) => ({
              ...amenity,
              icon_class: amenity.icon_class || 'ti ti-home'
            })) || [],
            // Ensure categories have proper icon_class values
            categories: apartment.categories?.map((category: any) => ({
              ...category,
              icon_class: category.icon_class || 'ti ti-home'
            })) || [],
            // Ensure extra_features have proper icon_class values
            extra_features: apartment.extra_features?.map((feature: any) => ({
              ...feature,
              icon_class: feature.icon_class || 'ti ti-home'
            })) || []
          };
          setSelectedApartment(formattedApartment);
          setIsApartmentModalOpen(true);
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        }}
      >
        <Card.Section>
          {coverImage ? (
            <Image
              src={coverImage}
              height={160}
              alt={apartment.title}
              fallbackSrc="/placeholder-apartment.jpg"
            />
          ) : (
            <Box 
              h={160} 
              style={{ 
                backgroundColor: '#f8f9fa', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
            >
              <IconHome size={48} color="#6c757d" />
            </Box>
          )}
        </Card.Section>

        <Stack gap="xs" mt="md">
          {/* Title and Price */}
          <Group justify="space-between" align="flex-start">
            <Text fw={600} size="sm" lineClamp={2}>
              {apartment.title}
            </Text>
            <Group gap={4}>
              <IconCurrencyDollar size={14} color="#28a745" />
              <Text fw={700} size="sm" c="green">
                {apartment.price} {apartment.currency}
              </Text>
            </Group>
          </Group>

          {/* Address */}
          <Group gap={4}>
            <IconMapPin size={14} color="#6c757d" />
            <Text size="xs" c="dimmed" lineClamp={1}>
              {apartment.address}
            </Text>
          </Group>

          {/* Apartment Details */}
          <Group gap="md">
            <Group gap={4}>
              <IconBed size={14} color="#6c757d" />
              <Text size="xs" c="dimmed">
                {apartment.rooms_display || `${apartment.rooms} xona`}
              </Text>
            </Group>
            
            <Group gap={4}>
              <IconRuler size={14} color="#6c757d" />
              <Text size="xs" c="dimmed">
                {apartment.total_area_m2} m²
              </Text>
            </Group>
            
            <Group gap={4}>
              <IconBuilding size={14} color="#6c757d" />
              <Text size="xs" c="dimmed">
                {apartment.floor}/{apartment.floors_total} qavat
              </Text>
            </Group>
          </Group>

          {/* Metro Distance */}
          {apartment.nearest_metro_info && (
            <Group gap={4}>
              <IconClock size={14} color="#007bff" />
              <Text size="xs" c="blue">
                {apartment.nearest_metro_info}
              </Text>
            </Group>
          )}

          {/* Categories */}
          {apartment.categories && apartment.categories.length > 0 && (
            <Group gap="xs">
              {apartment.categories.slice(0, 2).map((category: any) => (
                <Badge 
                  key={category.id} 
                  size="xs" 
                  variant="light" 
                  color="blue"
                >
                  {category.name}
                </Badge>
              ))}
              {apartment.categories.length > 2 && (
                <Badge size="xs" variant="light" color="gray">
                  +{apartment.categories.length - 2}
                </Badge>
              )}
            </Group>
          )}

          {/* View Details */}
          <Group justify="flex-end" mt="xs">
            <Group gap={4}>
              <IconExternalLink size={14} color="#007bff" />
              <Text size="xs" c="blue" fw={500}>
                Batafsil
              </Text>
            </Group>
          </Group>
        </Stack>
      </Card>
    );
  };

  // Handle results when they come back
  useEffect(() => {
    if (aiResults && isSearching) {
      // Debug: Log the actual response structure
      console.log('AI Search Response:', aiResults);
      console.log('Response keys:', Object.keys(aiResults || {}));
      console.log('Response structure:', {
        success: aiResults?.success,
        results: aiResults?.results,
        apartments: aiResults?.results?.apartments,
        query: aiResults?.query,
        message: aiResults?.message,
        error: aiResults?.error
      });
      
      // More flexible success detection - React Query returns data directly
      const responseData = aiResults;
      const hasResults = responseData?.results || responseData?.results?.apartments;
      const hasError = responseData?.error || responseData?.message;
      const isSuccess = responseData?.success !== false && hasResults && !hasError;
      
      console.log('Success check:', { 
        success: responseData?.success, 
        hasResults, 
        hasError, 
        isSuccess 
      });
      
      if (isSuccess) {
        onResults?.(aiResults);
      } else {
        const errorMessage = responseData?.message || responseData?.error || 'AI search failed';
        onError?.(translateBackendError(errorMessage));
      }
      setIsSearching(false);
    }
  }, [aiResults, isSearching, onResults, onError]);

  // Handle errors
  useEffect(() => {
    if (error && isSearching) {
      onError?.(t('ai_search_network_error_message', { 
        ns: 'home', 
        defaultValue: 'Network error occurred' 
      }));
      setIsSearching(false);
    }
  }, [error, isSearching, onError, t]);

  // Get translated examples based on current language
  const getExampleQueries = () => {
    const currentLanguage = localStorage.getItem('i18nextLng') || 'uz';
    
    const examples: { [key: string]: string[] } = {
      uz: [
        "metro yaqinidagi kvartira",
        "300 dollardan arzon studiya kvartira", 
        "Yunusobod tumanidagi 2 xonali kvartira",
        "Wi-Fi va avtoturargohli kvartira",
        "metroga 10 daqiqada arzon kvartira"
      ],
      ru: [
        "квартира рядом с метро",
        "студия дешевле 300 долларов",
        "2-комнатная квартира в Юнусабаде", 
        "квартира с Wi-Fi и парковкой",
        "дешевая квартира в 10 минутах от метро"
      ],
      en: [
        "apartment near metro station",
        "studio apartment under $300",
        "2-room apartment in Yunusobod",
        "apartment with Wi-Fi and parking", 
        "cheap apartment within 10 minutes of metro"
      ]
    };
    
    return examples[currentLanguage] || examples['uz'];
  };

  const exampleQueries = getExampleQueries();

  const renderCriteria = (criteria: any) => {
    if (!criteria) return null;

    const badges = [];
    
    if (criteria.rooms) {
      badges.push(
        <Badge key="rooms" leftSection={<IconHome size={12} />} color="blue" variant="light">
          {criteria.rooms === 'studio' ? 'Studio' : `${criteria.rooms} room${criteria.rooms > 1 ? 's' : ''}`}
        </Badge>
      );
    }
    
    if (criteria.price_max) {
      badges.push(
        <Badge key="price" leftSection={<IconCurrencyDollar size={12} />} color="green" variant="light">
          Under ${criteria.price_max}
        </Badge>
      );
    }
    
    if (criteria.metro_preference) {
      badges.push(
        <Badge key="metro" leftSection={<IconMapPin size={12} />} color="orange" variant="light">
          Near Metro
        </Badge>
      );
    }
    
    if (criteria.walking_distance_minutes) {
      badges.push(
        <Badge key="walking" leftSection={<IconClock size={12} />} color="purple" variant="light">
          {criteria.walking_distance_minutes} min walk
        </Badge>
      );
    }
    
    if (criteria.district) {
      badges.push(
        <Badge key="district" color="cyan" variant="light">
          {criteria.district}
        </Badge>
      );
    }

    return badges.length > 0 ? (
      <Group gap="xs" wrap="wrap">
        {badges}
      </Group>
    ) : null;
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={handleClose}
        title={
          <Group gap="xs">
            <IconRobot size={20} color="#6366f1" />
            <Text fw={600} size="lg">
              {t('ai_search_title', { ns: 'home', defaultValue: 'AI-Powered Search' })}
            </Text>
          </Group>
        }
      size="lg"
      centered
      closeOnClickOutside={false}
      closeOnEscape={true}
    >
      <Stack gap="md">
        {/* Search Input */}
        <Box>
          <Text size="sm" c="dimmed" mb="xs">
            {t('ai_search_description', { 
              ns: 'home', 
              defaultValue: 'Describe what you\'re looking for in natural language' 
            })}
          </Text>
          
          <Group gap="xs" align="flex-start">
            <TextInput
              placeholder={t('ai_search_placeholder', { 
                ns: 'home', 
                defaultValue: 'e.g., "apartment near metro station"' 
              })}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              leftSection={<IconSearch size={16} />}
              style={{ flex: 1 }}
              disabled={isLoading}
              size="md"
            />
            
            <CustomButton
              onClick={handleSearch}
              loading={isLoading}
              disabled={!query.trim() || isLoading}
              leftSection={<IconSparkles size={16} />}
              size="md"
            >
              {t('common_search')}
            </CustomButton>
          </Group>
        </Box>

        {/* Example Queries */}
        {!isSearching && !aiResults && (
          <Box>
            <Text size="sm" fw={500} mb="xs" c="dimmed">
              {t('ai_search_examples', { ns: 'home', defaultValue: 'Try these examples:' })}
            </Text>
            <Stack gap="xs">
              {exampleQueries.map((example, index) => (
                <Card
                  key={index}
                  padding="xs"
                  radius="md"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setQuery(example)}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <Text size="sm" c="dimmed">
                    "{example}"
                  </Text>
                </Card>
              ))}
            </Stack>
          </Box>
        )}

        {/* Loading State */}
        {isLoading && (
          <Box ta="center" py="xl">
            <Loader size="lg" color="blue" />
            <Text size="sm" c="dimmed" mt="md">
              {t('ai_search_processing', { ns: 'home', defaultValue: 'AI is analyzing your request...' })}
            </Text>
          </Box>
        )}

        {/* Results */}
        {aiResults && aiResults?.success !== false && (aiResults?.results || aiResults?.results?.apartments) && (
          <Box>
            {/* Results Header */}
            <Alert
              icon={<IconInfoCircle size={16} />}
              title={t('ai_search_results', { ns: 'home', defaultValue: 'Search Results' })}
              color="blue"
              variant="light"
              mb="md"
            >
              <Text size="sm" mb="xs">
                {t('ai_search_found', { 
                  ns: 'home', 
                  defaultValue: 'Found {{count}} apartments matching your criteria',
                  count: aiResults?.results?.count || aiResults?.results?.apartments?.length || 0
                })}
              </Text>
              
              {/* Extracted Criteria */}
              {aiResults?.query?.extracted_criteria && (
                <Box>
                  <Text size="xs" fw={500} mb="xs" c="dimmed">
                    {t('ai_search_criteria', { ns: 'home', defaultValue: 'Search Criteria:' })}
                  </Text>
                  {renderCriteria(aiResults?.query?.extracted_criteria)}
                </Box>
              )}
            </Alert>

            {/* Apartment Previews */}
            <ScrollArea h={400} mb="md">
              <Stack gap="md">
                {(aiResults?.results?.apartments || []).map((apartment: any) => 
                  renderApartmentPreview(apartment)
                )}
              </Stack>
            </ScrollArea>

            {/* Suggestions */}
            {(aiResults?.suggestions || aiResults?.query?.extracted_criteria?.suggestions) && (
              <Alert
                icon={<IconSparkles size={16} />}
                title={t('ai_search_suggestions', { ns: 'home', defaultValue: 'AI Suggestions' })}
                color="yellow"
                variant="light"
                mb="md"
              >
                <Stack gap="xs">
                  {translateSuggestions(aiResults?.suggestions || aiResults?.query?.extracted_criteria?.suggestions || []).map((suggestion: string, index: number) => (
                    <Group key={index} gap="xs" align="flex-start">
                      <Box
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          backgroundColor: '#ffc107',
                          marginTop: 6,
                          flexShrink: 0
                        }}
                      />
                      <Text size="sm" style={{ lineHeight: 1.4 }}>
                        {suggestion}
                      </Text>
                    </Group>
                  ))}
                </Stack>
              </Alert>
            )}

            {/* Action Buttons */}
            <Group justify="flex-start" mt="md">
              <CustomButton
                variant="outline"
                onClick={handleClose}
                leftSection={<IconX size={16} />}
              >
                {t('common_close', { ns: 'common', defaultValue: 'Close' })}
              </CustomButton>
            </Group>
          </Box>
        )}

        {/* Error State */}
        {aiResults && (aiResults?.success === false || (aiResults?.error && !aiResults?.results)) && (
          <Alert
            icon={<IconInfoCircle size={16} />}
            title={t('ai_search_error', { ns: 'home', defaultValue: 'Search Error' })}
            color="red"
            variant="light"
          >
            <Text size="sm">
              {translateBackendError(aiResults?.message || aiResults?.error || t('ai_search_error_message', { 
                ns: 'home', 
                defaultValue: 'Unable to process your search. Please try again.' 
              }))}
            </Text>
          </Alert>
        )}

        {/* Network Error */}
        {error && (
          <Alert
            icon={<IconInfoCircle size={16} />}
            title={t('ai_search_network_error', { ns: 'home', defaultValue: 'Network Error' })}
            color="red"
            variant="light"
          >
            <Text size="sm">
              {t('ai_search_network_error_message', { 
                ns: 'home', 
                defaultValue: 'Unable to connect to AI service. Please check your connection.' 
              })}
            </Text>
          </Alert>
        )}
      </Stack>
    </Modal>

    {/* Apartment Detail Modal */}
    <ApartmentDetailModal
      opened={isApartmentModalOpen}
      selectedCard={selectedApartment}
      onClose={() => {
        setIsApartmentModalOpen(false);
        setSelectedApartment(null);
      }}
      authModals={undefined}
    />
    </>
  );
};

export default AISearchModal;
