import * as React from 'react';
import { useMemo } from 'react';
import { Box, Typography, Grid, Paper, useTheme, alpha, Avatar, Chip, IconButton, LinearProgress } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StarIcon from '@mui/icons-material/Star';

/**
 * Creative Stat Card with gradient and animations
 */
const StatCard = ({ title, value, icon, gradient, trend, trendValue, subtitle }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isPositive = trend === 'up';

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        background: isDark
          ? alpha(theme.palette.background.paper, 0.6)
          : theme.palette.background.paper,
        border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 20px 40px ${alpha(gradient.split(' ')[1]?.replace(',', '') || '#000', 0.15)}`,
          '& .stat-icon-box': {
            transform: 'scale(1.1) rotate(5deg)',
          },
        },
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: -30,
          right: -30,
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: gradient,
          opacity: 0.1,
        }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box
          className="stat-icon-box"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 52,
            height: 52,
            borderRadius: 3,
            background: gradient,
            boxShadow: `0 8px 20px ${alpha(gradient.split(' ')[1]?.replace(',', '') || '#000', 0.3)}`,
            transition: 'transform 0.3s ease',
          }}
        >
          {icon}
        </Box>
        <IconButton size="small" sx={{ color: theme.palette.text.secondary }}>
          <MoreHorizIcon fontSize="small" />
        </IconButton>
      </Box>

      <Typography variant="body2" color="text.secondary" fontWeight={500} gutterBottom>
        {title}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
        <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: '-0.02em' }}>
          {value}
        </Typography>
        {trendValue && (
          <Chip
            size="small"
            icon={isPositive ? <TrendingUpIcon sx={{ fontSize: '14px !important' }} /> : <TrendingDownIcon sx={{ fontSize: '14px !important' }} />}
            label={trendValue}
            sx={{
              height: 22,
              fontSize: '0.7rem',
              fontWeight: 700,
              backgroundColor: alpha(isPositive ? '#4caf50' : '#f44336', 0.1),
              color: isPositive ? '#4caf50' : '#f44336',
              '& .MuiChip-icon': {
                color: 'inherit',
              },
            }}
          />
        )}
      </Box>

      {subtitle && (
        <Typography variant="caption" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Paper>
  );
};

/**
 * Activity Item Component
 */
const ActivityItem = ({ icon, iconBg, title, subtitle, time, isLast }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        py: 1.5,
        borderBottom: isLast ? 'none' : `1px solid ${alpha(theme.palette.divider, 0.08)}`,
        '&:hover': {
          '& .activity-icon': {
            transform: 'scale(1.1)',
          },
        },
      }}
    >
      <Avatar
        className="activity-icon"
        sx={{
          width: 40,
          height: 40,
          background: iconBg,
          transition: 'transform 0.2s ease',
        }}
      >
        {icon}
      </Avatar>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" fontWeight={600}>
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
        {time}
      </Typography>
    </Box>
  );
};

/**
 * Progress Card Component
 */
const ProgressCard = ({ title, value, total, color, icon }) => {
  const percentage = (value / total) * 100;

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 3,
        backgroundColor: alpha(color, 0.08),
        border: `1px solid ${alpha(color, 0.15)}`,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 28,
              height: 28,
              borderRadius: 1.5,
              backgroundColor: color,
            }}
          >
            {icon}
          </Box>
          <Typography variant="body2" fontWeight={600}>
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" fontWeight={700} color={color}>
          {value}/{total}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: 6,
          borderRadius: 3,
          backgroundColor: alpha(color, 0.2),
          '& .MuiLinearProgress-bar': {
            borderRadius: 3,
            backgroundColor: color,
          },
        }}
      />
    </Box>
  );
};

function Dashboard() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Chart data for Recharts
  const chartData = [
    { month: 'Jan', revenue: 32000, users: 1200, orders: 450 },
    { month: 'Feb', revenue: 28000, users: 1400, orders: 380 },
    { month: 'Mar', revenue: 42000, users: 1600, orders: 520 },
    { month: 'Apr', revenue: 35000, users: 1350, orders: 440 },
    { month: 'May', revenue: 48000, users: 1800, orders: 610 },
    { month: 'Jun', revenue: 38000, users: 1550, orders: 490 },
    { month: 'Jul', revenue: 45000, users: 1900, orders: 580 },
    { month: 'Aug', revenue: 33000, users: 1450, orders: 420 },
    { month: 'Sep', revenue: 40000, users: 1700, orders: 530 },
    { month: 'Oct', revenue: 36000, users: 1600, orders: 470 },
    { month: 'Nov', revenue: 52000, users: 2100, orders: 680 },
    { month: 'Dec', revenue: 45231, users: 2350, orders: 620 },
  ];

  // Table data for Material React Table
  const tableData = useMemo(
    () => [
      {
        id: 1,
        orderId: '#ORD-001',
        customer: 'Alice Johnson',
        product: 'Premium Widget',
        amount: '$299.99',
        status: 'Completed',
        date: '2026-01-08',
      },
      {
        id: 2,
        orderId: '#ORD-002',
        customer: 'Bob Smith',
        product: 'Standard Package',
        amount: '$149.99',
        status: 'Processing',
        date: '2026-01-09',
      },
      {
        id: 3,
        orderId: '#ORD-003',
        customer: 'Carol Williams',
        product: 'Deluxe Bundle',
        amount: '$499.99',
        status: 'Shipped',
        date: '2026-01-09',
      },
      {
        id: 4,
        orderId: '#ORD-004',
        customer: 'David Brown',
        product: 'Basic Plan',
        amount: '$79.99',
        status: 'Completed',
        date: '2026-01-10',
      },
      {
        id: 5,
        orderId: '#ORD-005',
        customer: 'Emma Davis',
        product: 'Enterprise Suite',
        amount: '$999.99',
        status: 'Processing',
        date: '2026-01-10',
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: 'orderId',
        header: 'Order ID',
        size: 100,
      },
      {
        accessorKey: 'customer',
        header: 'Customer',
        size: 150,
      },
      {
        accessorKey: 'product',
        header: 'Product',
        size: 180,
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        size: 100,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 120,
        Cell: ({ cell }) => {
          const status = cell.getValue();
          const statusColors = {
            Completed: '#4caf50',
            Processing: '#2196f3',
            Shipped: '#ff9800',
          };
          return (
            <Chip
              label={status}
              size="small"
              sx={{
                backgroundColor: alpha(statusColors[status] || '#666', 0.1),
                color: statusColors[status] || '#666',
                fontWeight: 600,
                fontSize: '0.75rem',
              }}
            />
          );
        },
      },
      {
        accessorKey: 'date',
        header: 'Date',
        size: 100,
      },
    ],
    []
  );

  const activities = [
    {
      icon: <CheckCircleIcon sx={{ fontSize: 20, color: 'white' }} />,
      iconBg: 'linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)',
      title: 'New user registered',
      subtitle: 'John Doe created an account',
      time: '2 min ago',
    },
    {
      icon: <ShoppingCartIcon sx={{ fontSize: 20, color: 'white' }} />,
      iconBg: 'linear-gradient(135deg, #2196f3 0%, #00bcd4 100%)',
      title: 'Order #1234 completed',
      subtitle: 'Successfully delivered',
      time: '1 hour ago',
    },
    {
      icon: <AttachMoneyIcon sx={{ fontSize: 20, color: 'white' }} />,
      iconBg: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)',
      title: 'Payment received',
      subtitle: '$2,500 from Alice',
      time: '3 hours ago',
    },
    {
      icon: <StarIcon sx={{ fontSize: 20, color: 'white' }} />,
      iconBg: 'linear-gradient(135deg, #ff9800 0%, #ffc107 100%)',
      title: 'New 5-star review',
      subtitle: 'Product received great feedback',
      time: '5 hours ago',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: '-0.02em' }}>
            Welcome back, John
          </Typography>
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              animation: 'wave 1.5s ease-in-out infinite',
              '@keyframes wave': {
                '0%, 100%': { transform: 'rotate(0deg)' },
                '25%': { transform: 'rotate(20deg)' },
                '75%': { transform: 'rotate(-10deg)' },
              },
            }}
          >
            👋
          </Box>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening with your business today.
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Total Revenue"
            value="$45,231"
            icon={<AttachMoneyIcon sx={{ color: 'white', fontSize: 26 }} />}
            gradient="linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)"
            trend="up"
            trendValue="+12.5%"
            subtitle="vs last month"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Total Users"
            value="2,350"
            icon={<PeopleIcon sx={{ color: 'white', fontSize: 26 }} />}
            gradient="linear-gradient(135deg, #2196f3 0%, #00bcd4 100%)"
            trend="up"
            trendValue="+8.2%"
            subtitle="new this week"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Total Orders"
            value="1,247"
            icon={<ShoppingCartIcon sx={{ color: 'white', fontSize: 26 }} />}
            gradient="linear-gradient(135deg, #ff9800 0%, #ffc107 100%)"
            trend="down"
            trendValue="-3.1%"
            subtitle="pending delivery"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Growth Rate"
            value="+24.5%"
            icon={<TrendingUpIcon sx={{ color: 'white', fontSize: 26 }} />}
            gradient="linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)"
            trend="up"
            trendValue="+4.8%"
            subtitle="year over year"
          />
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {/* Chart Section with Recharts */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              background: isDark ? alpha(theme.palette.background.paper, 0.6) : theme.palette.background.paper,
              border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="h6" fontWeight={700}>
                  Revenue Overview
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Monthly revenue statistics
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {['Week', 'Month', 'Year'].map((period, index) => (
                  <Chip
                    key={period}
                    label={period}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      backgroundColor: index === 1 ? theme.palette.primary.main : 'transparent',
                      color: index === 1 ? 'white' : theme.palette.text.secondary,
                      '&:hover': {
                        backgroundColor: index === 1 ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.1),
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>

            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.1)} />
                <XAxis
                  dataKey="month"
                  stroke={theme.palette.text.secondary}
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke={theme.palette.text.secondary}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    borderRadius: '8px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke={theme.palette.primary.main}
                  strokeWidth={3}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Activity Section */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              background: isDark ? alpha(theme.palette.background.paper, 0.6) : theme.palette.background.paper,
              border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight={700}>
                Recent Activity
              </Typography>
              <Chip
                label="View All"
                size="small"
                deleteIcon={<ArrowForwardIcon sx={{ fontSize: '14px !important' }} />}
                onDelete={() => { }}
                sx={{
                  fontWeight: 600,
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  '& .MuiChip-deleteIcon': {
                    color: theme.palette.primary.main,
                  },
                }}
              />
            </Box>

            <Box>
              {activities.map((activity, index) => (
                <ActivityItem
                  key={index}
                  {...activity}
                  isLast={index === activities.length - 1}
                />
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Bottom Section */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              background: isDark ? alpha(theme.palette.background.paper, 0.6) : theme.palette.background.paper,
              border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
            }}
          >
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Order Status
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <ProgressCard
                title="Completed"
                value={156}
                total={200}
                color="#4caf50"
                icon={<CheckCircleIcon sx={{ fontSize: 16, color: 'white' }} />}
              />
              <ProgressCard
                title="In Progress"
                value={32}
                total={200}
                color="#2196f3"
                icon={<AccessTimeIcon sx={{ fontSize: 16, color: 'white' }} />}
              />
              <ProgressCard
                title="Shipping"
                value={12}
                total={200}
                color="#ff9800"
                icon={<LocalShippingIcon sx={{ fontSize: 16, color: 'white' }} />}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Decorative circles */}
            <Box
              sx={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: '50%',
                backgroundColor: alpha('#fff', 0.1),
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -30,
                left: '30%',
                width: 100,
                height: 100,
                borderRadius: '50%',
                backgroundColor: alpha('#fff', 0.08),
              }}
            />

            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="h5" fontWeight={800} gutterBottom>
                Upgrade to Pro
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 3, maxWidth: 400 }}>
                Get access to advanced analytics, unlimited storage, and priority support with our Pro plan.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Chip
                  label="Upgrade Now"
                  sx={{
                    backgroundColor: 'white',
                    color: theme.palette.primary.main,
                    fontWeight: 700,
                    px: 1,
                    '&:hover': {
                      backgroundColor: alpha('#fff', 0.9),
                    },
                  }}
                />
                <Chip
                  label="Learn More"
                  variant="outlined"
                  sx={{
                    borderColor: alpha('#fff', 0.5),
                    color: 'white',
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: alpha('#fff', 0.1),
                    },
                  }}
                />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Orders Table with Material React Table */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12 }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              background: isDark ? alpha(theme.palette.background.paper, 0.6) : theme.palette.background.paper,
              border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
              overflow: 'hidden',
            }}
          >
            <Box sx={{ p: 3, pb: 0 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Recent Orders
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Latest customer orders and transactions
              </Typography>
            </Box>
            <MaterialReactTable
              columns={columns}
              data={tableData}
              enableColumnActions={false}
              enableColumnFilters={false}
              enablePagination={false}
              enableSorting={true}
              enableBottomToolbar={false}
              enableTopToolbar={false}
              muiTableBodyRowProps={{ hover: true }}
              muiTableProps={{
                sx: {
                  tableLayout: 'fixed',
                },
              }}
              muiTablePaperProps={{
                elevation: 0,
                sx: {
                  backgroundColor: 'transparent',
                },
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;