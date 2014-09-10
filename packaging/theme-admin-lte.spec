Name: theme-admin-lte
Group: Applications/Themes
Version: 7.0.0
Release: 1%{dist}
Summary: ClearOS 7 base theme
License: ClearCenter license
Packager: ClearCenter
Vendor: ClearCenter
Source: %{name}-%{version}.tar.gz
Requires: clearos-framework >= 7.0.0
Buildarch: noarch

%description
ClearOS 7 webconfig theme

%prep
%setup -q
%build

%install
mkdir -p -m 755 $RPM_BUILD_ROOT/usr/clearos/themes/AdminLTE
cp -r * $RPM_BUILD_ROOT/usr/clearos/themes/AdminLTE

%files
%defattr(-,root,root)
%dir /usr/clearos/themes/AdminLTE
/usr/clearos/themes/AdminLTE
