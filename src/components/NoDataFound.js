import React from 'react';

const NoDataFound = ({
  type = "search", // "search", "timesheet", "employee", "server", "filter", "task"
  title,
  message,
  showActions = true,
  onClearFilters,
  onRefresh
}) => {

  // Default titles and messages based on type
  const getDefaultContent = (type) => {
    switch(type) {
      case "timesheet":
        return {
          title: "No timesheets found for the applied filters",
          message: "To add new timesheets, click Create Timesheet"
        };
      case "employee":
        return {
          title: "Please begin typing to search for an employee",
          message: "Start typing an employee name or ID to see results"
        };
      case "server":
        return {
          title: "Server Connection Error",
          message: "Unable to connect to the server. Please check your internet connection and try again."
        };
      case "filter":
        return {
          title: "No results found for current filters",
          message: "Try adjusting your search criteria or clear filters to see all data"
        };
      case "task":
        return {
          title: "No tasks to list here",
          message: "No items have been added yet. Start by adding your first item using the form above."
        };
      default: // "search"
        return {
          title: "No Data Found",
          message: "No data matches your current search criteria. Try adjusting your filters or check back later."
        };
    }
  };

  const defaultContent = getDefaultContent(type);
  const finalTitle = title || defaultContent.title;
  const finalMessage = message || defaultContent.message;
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      {/* No Data Illustration */}
      <div className="mb-8">
        {type === "timesheet" && (
          <svg width="320" height="200" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background Circle */}
            <circle cx="160" cy="100" r="90" fill="#E0E7FF" opacity="0.6"/>
            <circle cx="160" cy="100" r="70" fill="#C7D2FE" opacity="0.4"/>

            {/* Floating Dots */}
            <circle cx="80" cy="40" r="2" fill="#93C5FD" className="animate-pulse"/>
            <circle cx="240" cy="50" r="1.5" fill="#A78BFA" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
            <circle cx="70" cy="160" r="1" fill="#60A5FA" className="animate-pulse" style={{animationDelay: '1s'}}/>
            <circle cx="250" cy="140" r="2" fill="#C084FC" className="animate-pulse" style={{animationDelay: '1.5s'}}/>

            {/* Robot Character */}
            <g transform="translate(120, 60)">
              {/* Robot Body */}
              <rect x="20" y="40" width="40" height="50" rx="8" fill="#F1F5F9"/>
              <rect x="22" y="42" width="36" height="46" rx="6" fill="#FFFFFF"/>

              {/* Robot Head */}
              <circle cx="40" cy="25" r="18" fill="#F1F5F9"/>
              <circle cx="40" cy="25" r="15" fill="#FFFFFF"/>

              {/* Robot Eyes */}
              <circle cx="35" cy="22" r="3" fill="#3B82F6"/>
              <circle cx="45" cy="22" r="3" fill="#3B82F6"/>
              <circle cx="35" cy="22" r="1" fill="#FFFFFF"/>
              <circle cx="45" cy="22" r="1" fill="#FFFFFF"/>

              {/* Robot Antenna */}
              <line x1="40" y1="7" x2="40" y2="15" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="40" cy="5" r="2" fill="#F59E0B"/>

              {/* Robot Arms */}
              <rect x="10" y="45" width="8" height="20" rx="4" fill="#E2E8F0"/>
              <rect x="62" y="45" width="8" height="20" rx="4" fill="#E2E8F0"/>
            </g>

            {/* Timesheet/Calendar */}
            <g transform="translate(180, 80)">
              <rect x="0" y="0" width="30" height="35" rx="3" fill="#FFFFFF" stroke="#C7D2FE" strokeWidth="2"/>
              <rect x="0" y="0" width="30" height="8" rx="3" fill="#8B5CF6"/>
              <circle cx="8" cy="-2" r="2" fill="#6366F1"/>
              <circle cx="22" cy="-2" r="2" fill="#6366F1"/>

              {/* Calendar Grid */}
              <line x1="5" y1="12" x2="25" y2="12" stroke="#E5E7EB" strokeWidth="1"/>
              <line x1="5" y1="17" x2="25" y2="17" stroke="#E5E7EB" strokeWidth="1"/>
              <line x1="5" y1="22" x2="25" y2="22" stroke="#E5E7EB" strokeWidth="1"/>
              <line x1="5" y1="27" x2="25" y2="27" stroke="#E5E7EB" strokeWidth="1"/>

              <line x1="10" y1="8" x2="10" y2="32" stroke="#E5E7EB" strokeWidth="1"/>
              <line x1="15" y1="8" x2="15" y2="32" stroke="#E5E7EB" strokeWidth="1"/>
              <line x1="20" y1="8" x2="20" y2="32" stroke="#E5E7EB" strokeWidth="1"/>
            </g>

            {/* Plus Icon */}
            <g transform="translate(200, 120)">
              <circle cx="0" cy="0" r="8" fill="#10B981"/>
              <line x1="-4" y1="0" x2="4" y2="0" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
              <line x1="0" y1="-4" x2="0" y2="4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
            </g>
          </svg>
        )}

        {type === "employee" && (
          <svg width="320" height="200" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background Circle */}
            <circle cx="160" cy="100" r="90" fill="#E0E7FF" opacity="0.6"/>
            <circle cx="160" cy="100" r="70" fill="#C7D2FE" opacity="0.4"/>

            {/* Floating Dots */}
            <circle cx="80" cy="40" r="2" fill="#93C5FD" className="animate-pulse"/>
            <circle cx="240" cy="50" r="1.5" fill="#A78BFA" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
            <circle cx="70" cy="160" r="1" fill="#60A5FA" className="animate-pulse" style={{animationDelay: '1s'}}/>

            {/* Robot Character */}
            <g transform="translate(120, 60)">
              {/* Robot Body */}
              <rect x="20" y="40" width="40" height="50" rx="8" fill="#F1F5F9"/>
              <rect x="22" y="42" width="36" height="46" rx="6" fill="#FFFFFF"/>

              {/* Robot Head */}
              <circle cx="40" cy="25" r="18" fill="#F1F5F9"/>
              <circle cx="40" cy="25" r="15" fill="#FFFFFF"/>

              {/* Robot Eyes */}
              <circle cx="35" cy="22" r="3" fill="#3B82F6"/>
              <circle cx="45" cy="22" r="3" fill="#3B82F6"/>

              {/* Robot Antenna */}
              <line x1="40" y1="7" x2="40" y2="15" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="40" cy="5" r="2" fill="#F59E0B"/>
            </g>

            {/* Search Box */}
            <g transform="translate(170, 80)">
              <rect x="0" y="0" width="40" height="25" rx="12" fill="#FFFFFF" stroke="#C7D2FE" strokeWidth="2"/>
              <circle cx="32" cy="12" r="6" fill="none" stroke="#6366F1" strokeWidth="2"/>
              <line x1="36" y1="16" x2="42" y2="22" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/>

              {/* Typing indicator */}
              <circle cx="8" cy="12" r="1" fill="#C7D2FE" className="animate-pulse"/>
              <circle cx="12" cy="12" r="1" fill="#C7D2FE" className="animate-pulse" style={{animationDelay: '0.2s'}}/>
              <circle cx="16" cy="12" r="1" fill="#C7D2FE" className="animate-pulse" style={{animationDelay: '0.4s'}}/>
            </g>

            {/* Keyboard */}
            <g transform="translate(90, 130)">
              <rect x="0" y="0" width="50" height="20" rx="3" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1"/>
              {/* Keys */}
              <rect x="3" y="3" width="4" height="4" rx="1" fill="#E5E7EB"/>
              <rect x="9" y="3" width="4" height="4" rx="1" fill="#E5E7EB"/>
              <rect x="15" y="3" width="4" height="4" rx="1" fill="#E5E7EB"/>
              <rect x="21" y="3" width="4" height="4" rx="1" fill="#E5E7EB"/>
              <rect x="6" y="9" width="4" height="4" rx="1" fill="#E5E7EB"/>
              <rect x="12" y="9" width="4" height="4" rx="1" fill="#E5E7EB"/>
              <rect x="18" y="9" width="4" height="4" rx="1" fill="#E5E7EB"/>
              <rect x="15" y="15" width="10" height="3" rx="1" fill="#E5E7EB"/>
            </g>
          </svg>
        )}

        {type === "server" && (
          <svg width="320" height="200" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background Circle */}
            <circle cx="160" cy="100" r="90" fill="#FEE2E2" opacity="0.6"/>
            <circle cx="160" cy="100" r="70" fill="#FECACA" opacity="0.4"/>

            {/* Floating Dots */}
            <circle cx="80" cy="40" r="2" fill="#F87171" className="animate-pulse"/>
            <circle cx="240" cy="50" r="1.5" fill="#EF4444" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
            <circle cx="70" cy="160" r="1" fill="#DC2626" className="animate-pulse" style={{animationDelay: '1s'}}/>

            {/* Sad Robot */}
            <g transform="translate(120, 60)">
              {/* Robot Body */}
              <rect x="20" y="40" width="40" height="50" rx="8" fill="#F1F5F9"/>
              <rect x="22" y="42" width="36" height="46" rx="6" fill="#FFFFFF"/>

              {/* Robot Head */}
              <circle cx="40" cy="25" r="18" fill="#F1F5F9"/>
              <circle cx="40" cy="25" r="15" fill="#FFFFFF"/>

              {/* Sad Eyes */}
              <path d="M32 20 L38 24" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
              <path d="M38 20 L32 24" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
              <path d="M42 20 L48 24" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
              <path d="M48 20 L42 24" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>

              {/* Sad Mouth */}
              <path d="M35 30 Q40 27 45 30" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" fill="none"/>

              {/* Robot Antenna with warning */}
              <line x1="40" y1="7" x2="40" y2="15" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="40" cy="5" r="2" fill="#EF4444"/>
            </g>

            {/* Server/Computer */}
            <g transform="translate(180, 80)">
              <rect x="0" y="0" width="25" height="30" rx="3" fill="#F3F4F6" stroke="#EF4444" strokeWidth="2"/>
              <rect x="3" y="3" width="19" height="8" rx="1" fill="#EF4444" opacity="0.3"/>
              <rect x="3" y="13" width="19" height="8" rx="1" fill="#EF4444" opacity="0.3"/>
              <rect x="3" y="23" width="19" height="4" rx="1" fill="#EF4444" opacity="0.3"/>

              {/* Error indicators */}
              <circle cx="6" cy="7" r="1" fill="#EF4444"/>
              <circle cx="6" cy="17" r="1" fill="#EF4444"/>
              <circle cx="6" cy="25" r="1" fill="#EF4444"/>

              {/* Warning symbol */}
              <path d="M15 5 L17 9 L13 9 Z" fill="#F59E0B"/>
              <circle cx="15" cy="7" r="0.5" fill="#FFFFFF"/>
            </g>

            {/* Disconnected WiFi */}
            <g transform="translate(200, 120)">
              <path d="M-8 -4 Q0 -8 8 -4" stroke="#EF4444" strokeWidth="2" fill="none"/>
              <path d="M-5 -2 Q0 -4 5 -2" stroke="#EF4444" strokeWidth="2" fill="none"/>
              <circle cx="0" cy="0" r="1" fill="#EF4444"/>
              <line x1="-10" y1="-6" x2="10" y2="6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
            </g>
          </svg>
        )}

        {type === "task" && (
          <svg width="320" height="200" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background Circle */}
            <circle cx="160" cy="100" r="90" fill="#E0E7FF" opacity="0.6"/>
            <circle cx="160" cy="100" r="70" fill="#C7D2FE" opacity="0.4"/>

            {/* Floating Dots */}
            <circle cx="80" cy="40" r="2" fill="#93C5FD" className="animate-pulse"/>
            <circle cx="240" cy="50" r="1.5" fill="#A78BFA" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
            <circle cx="70" cy="160" r="1" fill="#60A5FA" className="animate-pulse" style={{animationDelay: '1s'}}/>
            <circle cx="250" cy="140" r="2" fill="#C084FC" className="animate-pulse" style={{animationDelay: '1.5s'}}/>

            {/* Robot Character */}
            <g transform="translate(110, 60)">
              {/* Robot Body */}
              <rect x="20" y="40" width="40" height="50" rx="8" fill="#F1F5F9"/>
              <rect x="22" y="42" width="36" height="46" rx="6" fill="#FFFFFF"/>

              {/* Robot Head */}
              <circle cx="40" cy="25" r="18" fill="#F1F5F9"/>
              <circle cx="40" cy="25" r="15" fill="#FFFFFF"/>

              {/* Robot Eyes */}
              <circle cx="35" cy="22" r="3" fill="#3B82F6"/>
              <circle cx="45" cy="22" r="3" fill="#3B82F6"/>
              <circle cx="35" cy="22" r="1" fill="#FFFFFF"/>
              <circle cx="45" cy="22" r="1" fill="#FFFFFF"/>

              {/* Robot Antenna */}
              <line x1="40" y1="7" x2="40" y2="15" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="40" cy="5" r="2" fill="#F59E0B"/>

              {/* Robot Arms */}
              <rect x="10" y="45" width="8" height="20" rx="4" fill="#E2E8F0"/>
              <rect x="62" y="45" width="8" height="20" rx="4" fill="#E2E8F0"/>
            </g>

            {/* Clipboard/Task List */}
            <g transform="translate(170, 70)">
              {/* Clipboard Background */}
              <rect x="0" y="0" width="45" height="60" rx="4" fill="#FFFFFF" stroke="#C7D2FE" strokeWidth="2"/>

              {/* Clipboard Clip */}
              <rect x="15" y="-5" width="15" height="10" rx="3" fill="#3B82F6"/>
              <rect x="17" y="-3" width="11" height="6" rx="2" fill="#FFFFFF"/>

              {/* Task List Items */}
              <g transform="translate(5, 10)">
                {/* Task 1 - Completed */}
                <circle cx="5" cy="5" r="3" fill="#10B981"/>
                <path d="M3 5 L4.5 6.5 L7 3.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="12" y1="5" x2="32" y2="5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>

                {/* Task 2 - Completed */}
                <circle cx="5" cy="15" r="3" fill="#10B981"/>
                <path d="M3 15 L4.5 16.5 L7 13.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="12" y1="15" x2="28" y2="15" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>

                {/* Task 3 - Empty */}
                <circle cx="5" cy="25" r="3" fill="none" stroke="#D1D5DB" strokeWidth="1.5"/>
                <line x1="12" y1="25" x2="30" y2="25" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round"/>

                {/* Task 4 - Empty */}
                <circle cx="5" cy="35" r="3" fill="none" stroke="#D1D5DB" strokeWidth="1.5"/>
                <line x1="12" y1="35" x2="25" y2="35" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round"/>

                {/* Task 5 - Empty */}
                <circle cx="5" cy="45" r="3" fill="none" stroke="#D1D5DB" strokeWidth="1.5"/>
                <line x1="12" y1="45" x2="27" y2="45" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round"/>
              </g>
            </g>

            {/* Light Bulb Icon */}
            <g transform="translate(90, 130)">
              <circle cx="0" cy="0" r="6" fill="#F59E0B" opacity="0.8"/>
              <rect x="-2" y="4" width="4" height="3" rx="1" fill="#F59E0B" opacity="0.6"/>
              <line x1="-8" y1="-8" x2="-6" y2="-6" stroke="#F59E0B" strokeWidth="1" strokeLinecap="round"/>
              <line x1="8" y1="-8" x2="6" y2="-6" stroke="#F59E0B" strokeWidth="1" strokeLinecap="round"/>
              <line x1="0" y1="-12" x2="0" y2="-10" stroke="#F59E0B" strokeWidth="1" strokeLinecap="round"/>
            </g>
          </svg>
        )}

        {(type === "search" || type === "filter") && (
          <svg width="320" height="200" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background Circle */}
          <circle cx="160" cy="100" r="90" fill="#E0E7FF" opacity="0.6"/>
          <circle cx="160" cy="100" r="70" fill="#C7D2FE" opacity="0.4"/>

          {/* Floating Dots */}
          <circle cx="80" cy="40" r="2" fill="#93C5FD" className="animate-pulse"/>
          <circle cx="240" cy="50" r="1.5" fill="#A78BFA" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
          <circle cx="70" cy="160" r="1" fill="#60A5FA" className="animate-pulse" style={{animationDelay: '1s'}}/>
          <circle cx="250" cy="140" r="2" fill="#C084FC" className="animate-pulse" style={{animationDelay: '1.5s'}}/>
          <circle cx="120" cy="30" r="1" fill="#93C5FD" className="animate-pulse" style={{animationDelay: '2s'}}/>
          <circle cx="200" cy="170" r="1.5" fill="#A78BFA" className="animate-pulse" style={{animationDelay: '0.3s'}}/>

          {/* Main Character/Robot */}
          <g transform="translate(120, 60)">
            {/* Robot Body */}
            <rect x="20" y="40" width="40" height="50" rx="8" fill="#F1F5F9"/>
            <rect x="22" y="42" width="36" height="46" rx="6" fill="#FFFFFF"/>

            {/* Robot Head */}
            <circle cx="40" cy="25" r="18" fill="#F1F5F9"/>
            <circle cx="40" cy="25" r="15" fill="#FFFFFF"/>

            {/* Robot Eyes */}
            <circle cx="35" cy="22" r="3" fill="#3B82F6"/>
            <circle cx="45" cy="22" r="3" fill="#3B82F6"/>
            <circle cx="35" cy="22" r="1" fill="#FFFFFF"/>
            <circle cx="45" cy="22" r="1" fill="#FFFFFF"/>

            {/* Robot Antenna */}
            <line x1="40" y1="7" x2="40" y2="15" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="40" cy="5" r="2" fill="#F59E0B"/>

            {/* Robot Arms */}
            <rect x="10" y="45" width="8" height="20" rx="4" fill="#E2E8F0"/>
            <rect x="62" y="45" width="8" height="20" rx="4" fill="#E2E8F0"/>

            {/* Robot Legs */}
            <rect x="25" y="90" width="8" height="15" rx="4" fill="#E2E8F0"/>
            <rect x="47" y="90" width="8" height="15" rx="4" fill="#E2E8F0"/>
          </g>

          {/* Magnifying Glass */}
          <g transform="translate(180, 80)">
            <circle cx="20" cy="20" r="15" fill="none" stroke="#3B82F6" strokeWidth="3"/>
            <circle cx="20" cy="20" r="10" fill="#EBF4FF" opacity="0.5"/>
            <line x1="32" y1="32" x2="42" y2="42" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round"/>

            {/* Magnifying Glass Handle */}
            <circle cx="44" cy="44" r="3" fill="#1E40AF"/>
          </g>

          {/* Documents/Papers */}
          <g transform="translate(90, 120)">
            <rect x="0" y="0" width="25" height="30" rx="2" fill="#A78BFA" opacity="0.7"/>
            <rect x="5" y="5" width="25" height="30" rx="2" fill="#C084FC" opacity="0.8"/>
            <rect x="10" y="10" width="25" height="30" rx="2" fill="#DDD6FE"/>

            {/* Document Lines */}
            <line x1="15" y1="18" x2="28" y2="18" stroke="#8B5CF6" strokeWidth="1"/>
            <line x1="15" y1="22" x2="25" y2="22" stroke="#8B5CF6" strokeWidth="1"/>
            <line x1="15" y1="26" x2="30" y2="26" stroke="#8B5CF6" strokeWidth="1"/>
          </g>

          {/* Search/Folder Icon */}
          <g transform="translate(200, 120)">
            <path d="M5 10 L25 10 L30 15 L30 35 L5 35 Z" fill="#60A5FA" opacity="0.6"/>
            <path d="M5 10 L15 10 L18 7 L25 7 L25 10" fill="#3B82F6" opacity="0.4"/>
          </g>

          {/* Additional Decorative Elements */}
          <g transform="translate(140, 140)">
            <circle cx="0" cy="0" r="8" fill="none" stroke="#6366F1" strokeWidth="2" opacity="0.6"/>
            <circle cx="0" cy="0" r="4" fill="#6366F1" opacity="0.3"/>
          </g>

          <g transform="translate(200, 60)">
            <rect x="0" y="0" width="12" height="12" rx="2" fill="#F59E0B" opacity="0.5" transform="rotate(45)"/>
          </g>
        </svg>
        )}
      </div>

      {/* No Data Message */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{finalTitle}</h3>
        <p className="text-gray-600 mb-4 max-w-md">{finalMessage}</p>
        
        {showActions && (
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {onClearFilters && (
              <button 
                onClick={onClearFilters}
                className="px-6 py-2 bg-purple-200 text-gray-900 rounded-lg font-medium hover:bg-purple-300 transition-colors"
              >
                Clear Filters
              </button>
            )}
            {onRefresh && (
              <button 
                onClick={onRefresh}
                className="px-6 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors"
              >
                Refresh Data
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoDataFound;
