USE [master]
GO
/****** Object:  Database [BanHangOnline]    Script Date: 21/01/2018 11:07:16 PM ******/
CREATE DATABASE [BanHangOnline]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'BanHangOnline', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\BanHangOnline.mdf' , SIZE = 4288KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'BanHangOnline_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\BanHangOnline_log.ldf' , SIZE = 1072KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [BanHangOnline] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [BanHangOnline].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [BanHangOnline] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [BanHangOnline] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [BanHangOnline] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [BanHangOnline] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [BanHangOnline] SET ARITHABORT OFF 
GO
ALTER DATABASE [BanHangOnline] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [BanHangOnline] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [BanHangOnline] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [BanHangOnline] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [BanHangOnline] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [BanHangOnline] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [BanHangOnline] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [BanHangOnline] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [BanHangOnline] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [BanHangOnline] SET  ENABLE_BROKER 
GO
ALTER DATABASE [BanHangOnline] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [BanHangOnline] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [BanHangOnline] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [BanHangOnline] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [BanHangOnline] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [BanHangOnline] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [BanHangOnline] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [BanHangOnline] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [BanHangOnline] SET  MULTI_USER 
GO
ALTER DATABASE [BanHangOnline] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [BanHangOnline] SET DB_CHAINING OFF 
GO
ALTER DATABASE [BanHangOnline] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [BanHangOnline] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [BanHangOnline] SET DELAYED_DURABILITY = DISABLED 
GO
USE [BanHangOnline]
GO
/****** Object:  Table [dbo].[Comment]    Script Date: 21/01/2018 11:07:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comment](
	[maComment] [nchar](50) NOT NULL,
	[noiDungComment] [nvarchar](500) NULL,
	[ngayComment] [date] NOT NULL,
	[maSanPham] [nchar](10) NULL,
	[maTaiKhoan] [nchar](10) NULL,
 CONSTRAINT [PK_dbo.Comment] PRIMARY KEY CLUSTERED 
(
	[maComment] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[chitietHoaDonBanHang]    Script Date: 21/01/2018 11:07:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[chitietHoaDonBanHang](
	[maHoaDonBanHang] [nchar](10) NOT NULL,
	[maSanPham] [nchar](10) NOT NULL,
	[soLuong] [int] NULL,
	[giaBan] [money] NULL,
 CONSTRAINT [PK_dbo.chitietHoaDonBanHang] PRIMARY KEY CLUSTERED 
(
	[maHoaDonBanHang] ASC,
	[maSanPham] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[HinhAnhSanPham]    Script Date: 21/01/2018 11:07:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HinhAnhSanPham](
	[maHinhAnh] [nchar](10) NOT NULL,
	[tenHinhAnh] [nchar](10) NULL,
	[maSanPham] [nchar](10) NULL,
 CONSTRAINT [PK_dbo.HinhAnhSanPham] PRIMARY KEY CLUSTERED 
(
	[maHinhAnh] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[HinhQuangCao]    Script Date: 21/01/2018 11:07:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HinhQuangCao](
	[maHinh] [nchar](10) NOT NULL,
	[tenHinh] [nvarchar](250) NULL,
	[ngayCapNhat] [date] NULL,
 CONSTRAINT [PK_dbo.HinhQuangCao] PRIMARY KEY CLUSTERED 
(
	[maHinh] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[HoaDonBanHang]    Script Date: 21/01/2018 11:07:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HoaDonBanHang](
	[maHDBH] [nchar](10) NOT NULL,
	[ngayLapHoaDon] [date] NULL,
	[tongTien] [float] NULL,
	[maTaiKhoan] [nchar](10) NULL,
	[maThanhToan] [nchar](10) NULL,
 CONSTRAINT [PK_dbo.HoaDonBanHang] PRIMARY KEY CLUSTERED 
(
	[maHDBH] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[LoaiSanPham]    Script Date: 21/01/2018 11:07:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LoaiSanPham](
	[maLoaiSanPham] [nchar](10) NOT NULL,
	[tenLoaiSanPham] [nvarchar](250) NULL,
 CONSTRAINT [PK_dbo.LoaiSanPham] PRIMARY KEY CLUSTERED 
(
	[maLoaiSanPham] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[LoaiTaiKhoan]    Script Date: 21/01/2018 11:07:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LoaiTaiKhoan](
	[maLoaiTaiKhoan] [nchar](10) NOT NULL,
	[tenLoaiTaiKhoan] [nvarchar](250) NULL,
 CONSTRAINT [PK_dbo.LoaiTaiKhoan] PRIMARY KEY CLUSTERED 
(
	[maLoaiTaiKhoan] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[SanPham]    Script Date: 21/01/2018 11:07:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SanPham](
	[maSanPham] [nchar](10) NOT NULL,
	[tenSanPham] [nvarchar](250) NULL,
	[donGia] [money] NULL,
	[hinhAnh] [nvarchar](250) NULL,
	[gioiThieuSanPham] [nvarchar](500) NULL,
	[maLoaiSanPham] [nchar](10) NULL,
	[soLuong] [int] NULL,
 CONSTRAINT [PK_dbo.SanPham] PRIMARY KEY CLUSTERED 
(
	[maSanPham] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TaiKhoan]    Script Date: 21/01/2018 11:07:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TaiKhoan](
	[maTaiKhoan] [nchar](10) NOT NULL,
	[tenDangNhap] [nchar](20) NOT NULL,
	[matKhau] [nchar](20) NOT NULL,
	[maLoaiTaiKhoan] [nchar](10) NOT NULL,
 CONSTRAINT [PK_dbo.TaiKhoan] PRIMARY KEY CLUSTERED 
(
	[maTaiKhoan] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TinhTrangHoaDon]    Script Date: 21/01/2018 11:07:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TinhTrangHoaDon](
	[maTinhTrangHoaDon] [nchar](10) NOT NULL,
	[maHoaDonBanHang] [nchar](10) NOT NULL,
	[trangThaiHoaDon] [nchar](10) NULL,
	[ngay] [date] NULL,
 CONSTRAINT [PK_dbo.chitietTinhTrangHoaDon] PRIMARY KEY CLUSTERED 
(
	[maTinhTrangHoaDon] ASC,
	[maHoaDonBanHang] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ThanhToan]    Script Date: 21/01/2018 11:07:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ThanhToan](
	[maThanhToan] [nchar](10) NOT NULL,
	[hinhThucThanhToan] [nvarchar](50) NULL,
 CONSTRAINT [PK_dbo.ThanhToan] PRIMARY KEY CLUSTERED 
(
	[maThanhToan] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ThongTinTaiKhoan]    Script Date: 21/01/2018 11:07:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ThongTinTaiKhoan](
	[maTaiKhoan] [nchar](10) NOT NULL,
	[hoTen] [nvarchar](100) NULL,
	[sdt] [nchar](20) NULL,
	[email] [nchar](50) NULL,
	[diaChi1] [nvarchar](250) NULL,
	[diaChi2] [nvarchar](250) NULL,
	[ngaySinh] [date] NULL,
	[gioiTinh] [bit] NULL,
 CONSTRAINT [PK_ThongTinUser] PRIMARY KEY CLUSTERED 
(
	[maTaiKhoan] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_maSanPham]    Script Date: 21/01/2018 11:07:16 PM ******/
CREATE NONCLUSTERED INDEX [IX_maSanPham] ON [dbo].[Comment]
(
	[maSanPham] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_maTaiKhoan]    Script Date: 21/01/2018 11:07:16 PM ******/
CREATE NONCLUSTERED INDEX [IX_maTaiKhoan] ON [dbo].[Comment]
(
	[maTaiKhoan] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_maHoaDonBanHang]    Script Date: 21/01/2018 11:07:16 PM ******/
CREATE NONCLUSTERED INDEX [IX_maHoaDonBanHang] ON [dbo].[chitietHoaDonBanHang]
(
	[maHoaDonBanHang] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_maSanPham]    Script Date: 21/01/2018 11:07:16 PM ******/
CREATE NONCLUSTERED INDEX [IX_maSanPham] ON [dbo].[chitietHoaDonBanHang]
(
	[maSanPham] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_maSanPham]    Script Date: 21/01/2018 11:07:16 PM ******/
CREATE NONCLUSTERED INDEX [IX_maSanPham] ON [dbo].[HinhAnhSanPham]
(
	[maSanPham] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_maTaiKhoan]    Script Date: 21/01/2018 11:07:16 PM ******/
CREATE NONCLUSTERED INDEX [IX_maTaiKhoan] ON [dbo].[HoaDonBanHang]
(
	[maTaiKhoan] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_maThanhToan]    Script Date: 21/01/2018 11:07:16 PM ******/
CREATE NONCLUSTERED INDEX [IX_maThanhToan] ON [dbo].[HoaDonBanHang]
(
	[maThanhToan] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_LoaiSanPham]    Script Date: 21/01/2018 11:07:16 PM ******/
CREATE NONCLUSTERED INDEX [IX_LoaiSanPham] ON [dbo].[SanPham]
(
	[maLoaiSanPham] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_maLoaiTaiKhoan]    Script Date: 21/01/2018 11:07:16 PM ******/
CREATE NONCLUSTERED INDEX [IX_maLoaiTaiKhoan] ON [dbo].[TaiKhoan]
(
	[maLoaiTaiKhoan] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_maHoaDonBanHang]    Script Date: 21/01/2018 11:07:16 PM ******/
CREATE NONCLUSTERED INDEX [IX_maHoaDonBanHang] ON [dbo].[TinhTrangHoaDon]
(
	[maHoaDonBanHang] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_maTinhTrangHoaDon]    Script Date: 21/01/2018 11:07:16 PM ******/
CREATE NONCLUSTERED INDEX [IX_maTinhTrangHoaDon] ON [dbo].[TinhTrangHoaDon]
(
	[maTinhTrangHoaDon] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Comment]  WITH CHECK ADD  CONSTRAINT [FK_Comment_ThongTinUser] FOREIGN KEY([maTaiKhoan])
REFERENCES [dbo].[ThongTinTaiKhoan] ([maTaiKhoan])
GO
ALTER TABLE [dbo].[Comment] CHECK CONSTRAINT [FK_Comment_ThongTinUser]
GO
ALTER TABLE [dbo].[Comment]  WITH CHECK ADD  CONSTRAINT [FK_dbo.Comment_dbo.SanPham_maSanPham] FOREIGN KEY([maSanPham])
REFERENCES [dbo].[SanPham] ([maSanPham])
GO
ALTER TABLE [dbo].[Comment] CHECK CONSTRAINT [FK_dbo.Comment_dbo.SanPham_maSanPham]
GO
ALTER TABLE [dbo].[chitietHoaDonBanHang]  WITH CHECK ADD  CONSTRAINT [FK_dbo.chitietHoaDonBanHang_dbo.HoaDonBanHang_maHoaDonBanHang] FOREIGN KEY([maHoaDonBanHang])
REFERENCES [dbo].[HoaDonBanHang] ([maHDBH])
GO
ALTER TABLE [dbo].[chitietHoaDonBanHang] CHECK CONSTRAINT [FK_dbo.chitietHoaDonBanHang_dbo.HoaDonBanHang_maHoaDonBanHang]
GO
ALTER TABLE [dbo].[chitietHoaDonBanHang]  WITH CHECK ADD  CONSTRAINT [FK_dbo.chitietHoaDonBanHang_dbo.SanPham_maSanPham] FOREIGN KEY([maSanPham])
REFERENCES [dbo].[SanPham] ([maSanPham])
GO
ALTER TABLE [dbo].[chitietHoaDonBanHang] CHECK CONSTRAINT [FK_dbo.chitietHoaDonBanHang_dbo.SanPham_maSanPham]
GO
ALTER TABLE [dbo].[HinhAnhSanPham]  WITH CHECK ADD  CONSTRAINT [FK_HinhAnhSanPham_SanPham] FOREIGN KEY([maSanPham])
REFERENCES [dbo].[SanPham] ([maSanPham])
GO
ALTER TABLE [dbo].[HinhAnhSanPham] CHECK CONSTRAINT [FK_HinhAnhSanPham_SanPham]
GO
ALTER TABLE [dbo].[HoaDonBanHang]  WITH CHECK ADD  CONSTRAINT [FK_dbo.HoaDonBanHang_dbo.ThanhToan_maThanhToan] FOREIGN KEY([maThanhToan])
REFERENCES [dbo].[ThanhToan] ([maThanhToan])
GO
ALTER TABLE [dbo].[HoaDonBanHang] CHECK CONSTRAINT [FK_dbo.HoaDonBanHang_dbo.ThanhToan_maThanhToan]
GO
ALTER TABLE [dbo].[HoaDonBanHang]  WITH CHECK ADD  CONSTRAINT [FK_HoaDonBanHang_ThongTinUser] FOREIGN KEY([maTaiKhoan])
REFERENCES [dbo].[ThongTinTaiKhoan] ([maTaiKhoan])
GO
ALTER TABLE [dbo].[HoaDonBanHang] CHECK CONSTRAINT [FK_HoaDonBanHang_ThongTinUser]
GO
ALTER TABLE [dbo].[SanPham]  WITH CHECK ADD  CONSTRAINT [FK_SanPham_LoaiSanPham] FOREIGN KEY([maLoaiSanPham])
REFERENCES [dbo].[LoaiSanPham] ([maLoaiSanPham])
GO
ALTER TABLE [dbo].[SanPham] CHECK CONSTRAINT [FK_SanPham_LoaiSanPham]
GO
ALTER TABLE [dbo].[TaiKhoan]  WITH CHECK ADD  CONSTRAINT [FK_dbo.TaiKhoan_dbo.LoaiTaiKhoan_maLoaiTaiKhoan] FOREIGN KEY([maLoaiTaiKhoan])
REFERENCES [dbo].[LoaiTaiKhoan] ([maLoaiTaiKhoan])
GO
ALTER TABLE [dbo].[TaiKhoan] CHECK CONSTRAINT [FK_dbo.TaiKhoan_dbo.LoaiTaiKhoan_maLoaiTaiKhoan]
GO
ALTER TABLE [dbo].[TinhTrangHoaDon]  WITH CHECK ADD  CONSTRAINT [FK_dbo.chitietTinhTrangHoaDon_dbo.HoaDonBanHang_maHoaDonBanHang] FOREIGN KEY([maHoaDonBanHang])
REFERENCES [dbo].[HoaDonBanHang] ([maHDBH])
GO
ALTER TABLE [dbo].[TinhTrangHoaDon] CHECK CONSTRAINT [FK_dbo.chitietTinhTrangHoaDon_dbo.HoaDonBanHang_maHoaDonBanHang]
GO
ALTER TABLE [dbo].[ThongTinTaiKhoan]  WITH CHECK ADD  CONSTRAINT [FK_ThongTinTaiKhoan_TaiKhoan] FOREIGN KEY([maTaiKhoan])
REFERENCES [dbo].[TaiKhoan] ([maTaiKhoan])
GO
ALTER TABLE [dbo].[ThongTinTaiKhoan] CHECK CONSTRAINT [FK_ThongTinTaiKhoan_TaiKhoan]
GO
USE [master]
GO
ALTER DATABASE [BanHangOnline] SET  READ_WRITE 
GO
